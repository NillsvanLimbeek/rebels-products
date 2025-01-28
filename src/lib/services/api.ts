import { ApiGetResponse } from "./dto-types/api-get";

const baseUrl = import.meta.env.VITE_MOCK_API;

async function typesafeFetch<T>(
  method: RequestInit["method"],

  url: string,
): Promise<T> {
  const res = await fetch(baseUrl + url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`HTTP error ${res.status}: ${error || res.statusText}`);
  }

  return await res.json();
}

export const api = {
  get<T extends keyof ApiGetResponse>(url: T): Promise<ApiGetResponse[T]> {
    return typesafeFetch("GET", url);
  },
};
