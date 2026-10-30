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

export type SubmitResult = { status: "not-connected" };

// There is no backend yet and no confirmed club inbox, so nothing is sent.
// When the NestJS endpoint exists, replace this function so it posts the
// values and returns a result the form can show. The form handles the rest.
export async function submitEnquiry(
  values: EnquiryValues,
): Promise<SubmitResult> {
  void values;
  return { status: "not-connected" };
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
