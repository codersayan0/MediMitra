import type { ApiResponse } from "@/types";
import { STORAGE_KEYS } from "@/constants";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

interface RequestOptions extends RequestInit {
  auth?: boolean;
}

/** Thin fetch wrapper — every service call goes through here, never fetch() directly. */
export async function apiRequest<T>(
  path: string,
  { auth = false, headers, ...options }: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (auth) {
    const token = window.localStorage.getItem(STORAGE_KEYS.token);
    if (token) {
      (requestHeaders as Record<string, string>).Authorization = `Bearer ${token}`;
    }
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers: requestHeaders });
  } catch {
    return { success: false, message: "Unable to reach the server. Please check your connection." };
  }

  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!response.ok || !body) {
    return {
      success: false,
      message: body?.message ?? `Request failed with status ${response.status}`,
    };
  }

  return body;
}