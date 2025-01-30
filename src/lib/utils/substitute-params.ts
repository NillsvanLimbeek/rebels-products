import { RequestConfig } from "../types/RequestConfig";

/**
 * Substitutes parameters in a URL template with provided values.
 *
 * This function replaces placeholders in the format `{paramName}` with corresponding
 * values from the params object in the config. All parameter values are converted to strings.
 *
 * @param {string} url - The URL template containing parameters in {paramName} format
 * @param {RequestConfig} [config] - Configuration object that may contain params
 * @returns {string} The URL with all parameters substituted
 *
 * @example
 * const url = "/api/users/{userId}/posts/{postId}";
 * const config = {
 *   params: {
 *     userId: 123,
 *     postId: "abc-xyz"
 *   }
 * };
 *
 * const result = substituteParams(url, config);
 * // Returns: "/api/users/123/posts/abc-xyz"
 */
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
