export const ENQUIRY_TYPE_EVENT = "enquiry-type";
export const MESSAGE_MIN = 20;

export const enquiryTypes = [
  { id: "general", label: "General enquiry" },
  { id: "trials", label: "Player trials" },
  { id: "partnership", label: "Partnership & sponsorship" },
  { id: "media", label: "Media & press" },
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["id"];

export type EnquiryValues = {
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
  type: EnquiryType;
  subject: string;
  message: string;
  consent: boolean;
};

export type EnquiryField =
  | "fullName"
  | "email"
  | "phone"
  | "message"
  | "consent";
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const emptyEnquiry: EnquiryValues = {
  fullName: "",
  email: "",
  phone: "",
  organisation: "",
  type: "general",
  subject: "",
  message: "",
  consent: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Keep these rules in step with CreateEnquiryDto in the API. The API checks
// everything again, so this is only for fast feedback in the browser.
export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (values.email.trim() === "") {
    errors.email = "Enter your email address.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address, for example name@domain.ug.";
  }

  const phone = values.phone.trim();
  if (phone !== "") {
    const digits = phone.replace(/\D/g, "");
    if (!/^[+()\-\s\d]+$/.test(phone) || digits.length < 7) {
      errors.phone = "Enter a valid phone number, or leave this blank.";
    }
  }

  if (values.message.trim().length < MESSAGE_MIN) {
    errors.message = `Write at least ${MESSAGE_MIN} characters so the club can help you.`;
  }

  if (!values.consent) {
    errors.consent = "Please tick the box so the club can reply to you.";
  }

  return errors;
}

// Set in .env.local, for example http://localhost:3001. Without it the form
// still validates but cannot send, and says so.
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
export const apiConfigured = Boolean(API_URL);

export type SubmitResult =
  | { status: "sent" }
  | { status: "not-connected" } // no API address configured
  | { status: "rejected" } // the API refused the details (HTTP 400)
  | { status: "failed" }; // network error, timeout or server error

export async function submitEnquiry(
  values: EnquiryValues,
): Promise<SubmitResult> {
  if (!API_URL) return { status: "not-connected" };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`${API_URL}/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Only the fields the API accepts. It rejects anything extra.
      body: JSON.stringify({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        organisation: values.organisation,
        type: values.type,
        subject: values.subject,
        message: values.message,
        consent: values.consent,
      }),
      signal: controller.signal,
    });

    if (response.ok) return { status: "sent" };
    if (response.status === 400) return { status: "rejected" };
    return { status: "failed" };
  } catch {
    return { status: "failed" };
  } finally {
    clearTimeout(timer);
  }
}

// Lets buttons elsewhere on the page choose the enquiry type and scroll to the
// form.
export function selectEnquiryType(type: EnquiryType) {
  window.dispatchEvent(
    new CustomEvent<EnquiryType>(ENQUIRY_TYPE_EVENT, { detail: type }),
  );
  document
    .getElementById("enquiry")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
