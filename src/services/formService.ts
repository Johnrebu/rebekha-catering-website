import { 
  collection, 
  addDoc, 
  serverTimestamp,
  query,
  where,
  getDocs 
} from "firebase/firestore";
import app from "@/config/firebase";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

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
 * Submits an inquiry to Firestore and sends email notification
 */
export const submitInquiry = async (data: InquiryData): Promise<string> => {
  try {
    // Add inquiry to Firestore
    const docRef = await addDoc(collection(db, "inquiries"), {
      ...data,
      createdAt: serverTimestamp(),
      status: "new",
      ipAddress: await getClientIp(),
    });

    // Send email notification via webhook
    await sendEmailNotification(data, docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    throw new Error("Failed to submit inquiry. Please try again.");
  }
};

/**
 * Sends email notification to admin and customer
 */
const sendEmailNotification = async (data: InquiryData, inquiryId: string): Promise<void> => {
  try {
    // Using a webhook endpoint for email notifications
    // You can replace this with SendGrid, Resend, or another email service
    const webhookUrl = import.meta.env.VITE_EMAIL_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("Email webhook not configured. Inquiry saved but email not sent.");
      return;
    }

    const emailPayload = {
      to: data.email,
      adminEmail: "reburr94@gmail.com",
      subject: "We Received Your Catering Inquiry - Rebekha Catering Services",
      customerName: data.name,
      inquiryDetails: {
        ...data,
        inquiryId,
      },
      adminSubject: `New Inquiry from ${data.name} - Rebekha Catering`,
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_EMAIL_WEBHOOK_SECRET || ""}`,
      },
      body: JSON.stringify(emailPayload),
    });
  } catch (error) {
    console.error("Error sending email notification:", error);
    // Don't throw - inquiry is already saved in Firestore
  }
};

/**
 * Gets client IP address
 */
const getClientIp = async (): Promise<string> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip || "unknown";
  } catch {
    return "unknown";
  }
};

/**
 * Retrieves inquiries for a specific email (for customer reference)
 */
export const getInquiriesByEmail = async (email: string): Promise<InquiryData[]> => {
  try {
    const q = query(collection(db, "inquiries"), where("email", "==", email));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as InquiryData[];
  } catch (error) {
    console.error("Error retrieving inquiries:", error);
    return [];
  }
};

/**
 * Validates inquiry data before submission
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
