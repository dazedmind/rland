/**
 * Server-side fetch helper that includes the RLINK_API_KEY for internal API calls.
 * Use when your server needs to call your own API routes (e.g. from CMS webhook).
 *
 * For external CMS calling your API, include the header:
 *   x-api-key: <RLINK_API_KEY>
 */
export async function apiFetch<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey = process.env.RLINK_API_KEY;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "http://localhost:3000";
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

  const headers = new Headers(options.headers);
  if (apiKey) {
    headers.set("x-api-key", apiKey);
  }

  const response = await fetch(fullUrl, { ...options, headers });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
