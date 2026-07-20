import { fetcher } from "@/lib/fetcher";

/**
 * Submit tour inquiry or buyer message (POST /api/inquiries)
 */
export async function submitInquiry(inquiryData) {
  return fetcher("/api/inquiries", {
    method: "POST",
    body: inquiryData,
  });
}
