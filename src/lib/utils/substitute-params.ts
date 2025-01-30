import { RequestConfig } from "../types/RequestConfig";

export function substituteParams<T extends string>(
  url: string,
  config?: RequestConfig<T>,
): string {
  if (!config?.params) {
    return url;
  }

  let resultUrl = url;

  Object.entries(config.params).forEach(([key, value]) => {
    resultUrl = resultUrl.replace(`{${key}}`, String(value));
  });

  return resultUrl;
}
