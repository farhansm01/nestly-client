/**
 * Shared API fetch wrapper for nestly-client
 * Connects to the Nestly backend server using process.env.NEXT_PUBLIC_SERVER_URL
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:5000";

export async function fetcher(endpoint, options = {}) {
  const { headers, query, body, ...customConfig } = options;

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
  const url = `${BASE_URL}${cleanEndpoint}${queryString}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    method: customConfig.method || "GET",
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
