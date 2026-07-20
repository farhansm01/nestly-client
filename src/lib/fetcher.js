/**
 * Shared API fetch wrapper for nestly-client
 * Connects to the Nestly backend server (https://nestly-server-sigma.vercel.app in production)
 */

const getBackendServerURL = () => {
  const envUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && !envUrl.includes("localhost")) {
    return envUrl;
  }
  if (typeof window !== "undefined" && !window.location?.hostname?.includes("localhost")) {
    return "https://nestly-server-sigma.vercel.app";
  }
  return "http://localhost:5000";
};

const INTERNAL_SECRET =
  process.env.NEXT_PUBLIC_INTERNAL_API_SECRET || "resellhub_internal_secret_2026";

export async function fetcher(endpoint, options = {}) {
  const { headers, query, body, ...customConfig } = options;

  const baseUrl = getBackendServerURL();

  // Build query string if query object provided
  let queryString = "";
  if (query && typeof query === "object") {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value);
      }
    });
    const str = params.toString();
    if (str) queryString = `?${str}`;
  }

  // Ensure clean path join
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}${queryString}`;
  console.log("[Nestly API Fetch]:", url);

  const defaultHeaders = {
    "Content-Type": "application/json",
    "INTERNAL_API_SECRET": INTERNAL_SECRET,
    "x-internal-secret": INTERNAL_SECRET,
  };

  const config = {
    method: customConfig.method || "GET",
    credentials: "include", // Send session cookies cross-origin
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...customConfig,
  };

  if (body) {
    config.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    // Handle 204 No Content
    if (response.status === 204) {
      return null;
    }

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMessage =
        (typeof data === "object" && data?.message) ||
        (typeof data === "string" && data) ||
        `Request failed with status ${response.status}`;

      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (!err.status) {
      err.message = err.message || "Network error. Please check your connection.";
    }
    throw err;
  }
}

export default fetcher;
