const FORM_SUBMIT_EMAIL = import.meta.env.VITE_FORM_SUBMIT_EMAIL || "reburr94@gmail.com";
const FORM_SUBMIT_DISPATCH_DELAY_MS = 800;
const SHOULD_OPEN_FORM_SUBMIT_PAGE = import.meta.env.DEV;

export interface InquiryData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  guestCount: string;
  date: string;
  message: string;
}

/**
 * Submits an inquiry through FormSubmit's free HTML form endpoint.
 */
export const submitInquiry = async (data: InquiryData): Promise<string> => {
  try {
    const inquiryId = `inquiry-${Date.now()}`;

    await submitToFormSubmit({
      _subject: `New Inquiry from ${data.name} - Rebekha Catering`,
      _captcha: "false",
      _template: "table",
      _next: window.location.href,
      inquiry_id: inquiryId,
      source_page: window.location.href,
      name: data.name,
      email: data.email,
      phone: data.phone,
      event_type: data.eventType,
      guest_count: data.guestCount || "Not specified",
      event_date: data.date,
      message: data.message,
    });

    return inquiryId;
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to submit inquiry. Please try again."
    );
  }
};

const submitToFormSubmit = async (fields: Record<string, string>): Promise<void> => {
  if (typeof document === "undefined") {
    throw new Error("Form submission is only available in the browser.");
  }

  const endpoint = `https://formsubmit.co/${FORM_SUBMIT_EMAIL}`;
  const frameName = `formsubmit-frame-${Date.now()}`;
  const iframe = document.createElement("iframe");
  const form = document.createElement("form");

  iframe.name = frameName;
  iframe.title = "Form submission";
  iframe.style.display = "none";

  form.action = endpoint;
  form.method = "POST";
  form.target = SHOULD_OPEN_FORM_SUBMIT_PAGE ? "_blank" : frameName;
  form.style.display = "none";

  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  if (!SHOULD_OPEN_FORM_SUBMIT_PAGE) {
    document.body.appendChild(iframe);
  }
  document.body.appendChild(form);

  form.submit();

  await new Promise((resolve) => window.setTimeout(resolve, FORM_SUBMIT_DISPATCH_DELAY_MS));

  form.remove();
  if (!SHOULD_OPEN_FORM_SUBMIT_PAGE) {
    window.setTimeout(() => iframe.remove(), 5000);
  }
};

/**
 * Retrieves inquiries for a specific email.
 *
 * FormSubmit delivers inquiries by email and does not expose a free client-side
 * retrieval API, so this returns an empty list for compatibility.
 */
export const getInquiriesByEmail = async (): Promise<InquiryData[]> => [];

/**
 * Validates inquiry data before submission.
 */
export const validateInquiryData = (data: InquiryData): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name?.trim()) errors.push("Name is required");
  if (!data.email?.trim()) errors.push("Email is required");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("Valid email is required");
  if (!data.phone?.trim()) errors.push("Phone is required");
  if (!/^\d{10,}$/.test(data.phone.replace(/\D/g, ""))) errors.push("Valid phone number is required");

  return {
    valid: errors.length === 0,
    errors,
  };
};
