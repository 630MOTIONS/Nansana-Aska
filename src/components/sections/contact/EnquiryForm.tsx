"use client";

import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Info, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  ENQUIRY_TYPE_EVENT,
  MESSAGE_MIN,
  apiConfigured,
  emptyEnquiry,
  enquiryTypes,
  submitEnquiry,
  validateEnquiry,
} from "@/lib/enquiry";
import type {
  EnquiryErrors,
  EnquiryField,
  EnquiryType,
  EnquiryValues,
  SubmitResult,
} from "@/lib/enquiry";

type Status = "idle" | "submitting" | SubmitResult["status"];

const fieldIds: Record<EnquiryField, string> = {
  fullName: "enquiry-name",
  email: "enquiry-email",
  phone: "enquiry-phone",
  message: "enquiry-message",
  consent: "enquiry-consent",
};

const fieldOrder: EnquiryField[] = [
  "fullName",
  "email",
  "phone",
  "message",
  "consent",
];

const control =
  "w-full rounded-md border-2 border-transparent bg-surface-tint px-4 py-3 text-ink placeholder:text-ink-muted/70 aria-invalid:border-red-700";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
};

function Field({
  id,
  label,
  hint,
  required,
  error,
  className,
  children,
}: FieldProps) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label
          htmlFor={id}
          className="text-label font-bold uppercase tracking-wide text-ink"
        >
          {label}
          {required && (
            <span className="text-brand-orange" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
        {hint && <span className="text-label text-ink-muted">{hint}</span>}
      </div>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-sm font-semibold text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default function EnquiryForm() {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  // Buttons elsewhere on the page can choose the enquiry type.
  useEffect(() => {
    function onSelect(event: Event) {
      const type = (event as CustomEvent<EnquiryType>).detail;
      setValues((v) => ({ ...v, type }));
      setStatus("idle");
    }
    window.addEventListener(ENQUIRY_TYPE_EVENT, onSelect);
    return () => window.removeEventListener(ENQUIRY_TYPE_EVENT, onSelect);
  }, []);

  function update<K extends keyof EnquiryValues>(
    key: K,
    value: EnquiryValues[K],
  ) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setStatus("idle");
  }

  const invalid = (field: EnquiryField) => (errors[field] ? true : undefined);
  const describedBy = (field: EnquiryField) =>
    errors[field] ? `${fieldIds[field]}-error` : undefined;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validateEnquiry(values);
    setErrors(found);

    const first = fieldOrder.find((field) => found[field]);
    if (first) {
      setStatus("idle");
      document.getElementById(fieldIds[first])?.focus();
      return;
    }

    setStatus("submitting");
    const result = await submitEnquiry(values);
    setStatus(result.status);

    if (result.status === "sent") {
      setValues(emptyEnquiry);
      setErrors({});
    }
  }

  return (
    <section
      id="enquiry"
      aria-label="Send us an enquiry"
      className="scroll-mt-8 bg-surface py-16"
    >
      <div className="mx-auto w-full max-w-3xl px-4">
        <SectionHeading
          align="center"
          eyebrow="Direct correspondence"
          eyebrowTone="gold"
          title="Send us an enquiry"
          description="Choose the reason for your enquiry and provide a few details so the club can help you."
        />

        <form
          noValidate
          onSubmit={onSubmit}
          className="mt-8 rounded-2xl bg-white p-6 shadow-card sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id={fieldIds.fullName}
              label="Full name"
              hint="First & last"
              required
              error={errors.fullName}
            >
              <input
                id={fieldIds.fullName}
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="e.g. Ronald Ssekandi"
                value={values.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                aria-required="true"
                aria-invalid={invalid("fullName")}
                aria-describedby={describedBy("fullName")}
                className={control}
              />
            </Field>

            <Field
              id={fieldIds.email}
              label="Email address"
              hint="Active inbox"
              required
              error={errors.email}
            >
              <input
                id={fieldIds.email}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@domain.ug"
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                aria-required="true"
                aria-invalid={invalid("email")}
                aria-describedby={describedBy("email")}
                className={control}
              />
            </Field>

            <Field
              id={fieldIds.phone}
              label="Phone / WhatsApp"
              hint="Optional"
              error={errors.phone}
            >
              <input
                id={fieldIds.phone}
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+256 700 000 000"
                value={values.phone}
                onChange={(e) => update("phone", e.target.value)}
                aria-invalid={invalid("phone")}
                aria-describedby={describedBy("phone")}
                className={control}
              />
            </Field>

            <Field
              id="enquiry-organisation"
              label="Organisation / club"
              hint="Optional"
            >
              <input
                id="enquiry-organisation"
                name="organisation"
                type="text"
                autoComplete="organization"
                placeholder="e.g. Wakiso Sports Media / Partner Ltd"
                value={values.organisation}
                onChange={(e) => update("organisation", e.target.value)}
                className={control}
              />
            </Field>

            <Field
              id="enquiry-type"
              label="Enquiry type"
              hint="Category"
              required
            >
              <select
                id="enquiry-type"
                name="type"
                value={values.type}
                onChange={(e) => update("type", e.target.value as EnquiryType)}
                className={control}
              >
                {enquiryTypes.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="enquiry-subject" label="Subject line" hint="Optional">
              <input
                id="enquiry-subject"
                name="subject"
                type="text"
                placeholder="Summary of your message..."
                value={values.subject}
                onChange={(e) => update("subject", e.target.value)}
                className={control}
              />
            </Field>

            <Field
              id={fieldIds.message}
              label="Message"
              hint={`Min. ${MESSAGE_MIN} characters`}
              required
              error={errors.message}
              className="sm:col-span-2"
            >
              <textarea
                id={fieldIds.message}
                name="message"
                rows={5}
                placeholder="Please provide specific details regarding your enquiry, squad experience, or partnership proposal..."
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                aria-required="true"
                aria-invalid={invalid("message")}
                aria-describedby={describedBy("message")}
                className={control}
              />
            </Field>
          </div>

          <div className="mt-5">
            <div className="flex items-start gap-3">
              <input
                id={fieldIds.consent}
                name="consent"
                type="checkbox"
                checked={values.consent}
                onChange={(e) => update("consent", e.target.checked)}
                aria-required="true"
                aria-invalid={invalid("consent")}
                aria-describedby={describedBy("consent")}
                className="mt-1 h-4 w-4 shrink-0 accent-navy"
              />
              <label
                htmlFor={fieldIds.consent}
                className="text-sm text-ink-muted"
              >
                I agree to Nansana ASKA Futsal Club management using these
                details to respond to my enquiry.
              </label>
            </div>
            {errors.consent && (
              <p
                id={`${fieldIds.consent}-error`}
                className="mt-1.5 text-sm font-semibold text-red-700"
              >
                {errors.consent}
              </p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-brand-orange px-6 py-3 text-button font-bold uppercase tracking-wide text-ink transition-colors hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Submit enquiry"}
              <Send size={14} aria-hidden />
            </button>
          </div>

          <div role="status" aria-live="polite">
            {status === "sent" && (
              <p className="mt-4 rounded-md bg-surface-tint p-4 text-sm font-semibold text-navy">
                Thank you. Your enquiry has been received.
              </p>
            )}
            {status === "rejected" && (
              <p className="mt-4 rounded-md bg-red-50 p-4 text-sm font-semibold text-red-800">
                Some of your details weren’t accepted. Please check the form and
                try again.
              </p>
            )}
            {status === "failed" && (
              <p className="mt-4 rounded-md bg-red-50 p-4 text-sm font-semibold text-red-800">
                We couldn’t send your enquiry just now. Please try again in a
                few minutes.
              </p>
            )}
            {status === "not-connected" && (
              <p className="mt-4 rounded-md bg-surface-tint p-4 text-sm font-semibold text-navy">
                Your details look good, but nothing has been sent, because this
                form isn’t connected to the club’s inbox yet.
              </p>
            )}
          </div>

          {!apiConfigured && (
            <p className="mt-5 flex gap-3 rounded-md bg-surface-strong p-4 text-sm text-ink-muted">
              <Info
                size={18}
                className="mt-0.5 shrink-0 text-navy"
                aria-hidden
              />
              <span>
                <strong className="text-navy">Notice:</strong> this form checks
                your entries but can’t send them yet. Enquiries will only reach
                the club once the website is connected to its mail service.
              </span>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
