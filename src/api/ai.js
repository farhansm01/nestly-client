import { fetcher } from "@/lib/fetcher";

/**
 * Fetch AI Property Recommendations based on user lifestyle preferences
 */
export async function getAIPropertyRecommendations(preferences = {}) {
  return fetcher("/api/ai/recommend", {
    method: "POST",
    body: JSON.stringify(preferences),
  });
}

/**
 * Audit lease / property agreement document text using AI Document Intelligence
 */
export async function auditAIDocumentText(documentText = "") {
  return fetcher("/api/ai/lease-audit", {
    method: "POST",
    body: JSON.stringify({ documentText }),
  });
}

/**
 * Send message to Nestly AI Real Estate Chat Assistant
 */
export async function sendAIChatMessage({ message, history = [], propertyContext = null }) {
  return fetcher("/api/ai/chat", {
    method: "POST",
    body: JSON.stringify({ message, history, propertyContext }),
  });
}
