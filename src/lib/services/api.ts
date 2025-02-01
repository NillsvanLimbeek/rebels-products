import { RequestConfig } from "../types/RequestConfig";
import { substituteParams } from "../utils/substitute-params";
import { ApiDeleteRequest, ApiDeleteResponse } from "./dto-types/api-delete";
import { ApiGetResponse } from "./dto-types/api-get";
import { ApiPostRequest, ApiPostResponse } from "./dto-types/api-post";
import { ApiPutRequest, ApiPutResponse } from "./dto-types/api.put";

const baseUrl = import.meta.env.VITE_MOCK_API;

async function typesafeFetch<T>(
  method: RequestInit["method"],
  url: string,
  config?: RequestConfig<string>,
): Promise<T> {
  const res = await fetch(baseUrl + substituteParams(url, config), {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: config?.body,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`HTTP error ${res.status}: ${error || res.statusText}`);
  }

  return await res.json();
}

export const api = {
  get<T extends keyof ApiGetResponse>(
    url: T,
    config?: RequestConfig<string>,
  ): Promise<ApiGetResponse[T]> {
    return typesafeFetch("GET", url, {
      ...config,
    });
  },

  async post<T extends keyof ApiPostRequest & keyof ApiPostResponse>(
    path: T,
    data: ApiPostRequest[T],
    config?: RequestConfig<string>,
  ): Promise<ApiPostResponse[T]> {
    return typesafeFetch<ApiPostResponse[T]>("POST", path, {
      ...config,
      headers: {
        ...config?.headers,
      },
      body: JSON.stringify(data),
    });
  },

  async put<T extends keyof ApiPutRequest & keyof ApiPutResponse>(
    path: T,
    data: ApiPutRequest[T],
    config?: RequestConfig<string>,
  ): Promise<ApiPutResponse[T]> {
    return typesafeFetch("PUT", path, {
      ...config,
      headers: {
        ...config?.headers,
      },
      body: JSON.stringify(data),
    });
  },

  async delete<T extends keyof ApiDeleteRequest & keyof ApiDeleteResponse>(
    path: T,
    config?: RequestConfig<string>,
  ): Promise<ApiDeleteResponse[T]> {
    return typesafeFetch("DELETE", path, {
      ...config,
      headers: {
        ...config?.headers,
      },
    });
  },
};
