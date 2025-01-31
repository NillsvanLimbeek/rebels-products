import { describe, it, expect } from "vitest";
import { substituteParams } from "./substitute-params.ts";
import { RequestConfig } from "../types/RequestConfig.ts";

describe("substitute params", () => {
  it("should replace single parameter in the URL", () => {
    const url = "/api/users/{userId}";
    const config = {
      params: {
        userId: "123",
      },
    } satisfies RequestConfig<string>;

    const result = substituteParams(url, config);
    expect(result).toBe("/api/users/123");
  });

  it("should replace multiple parameters in the URL", () => {
    const url = "/api/users/{userId}/posts/{postId}";
    const config = {
      params: {
        userId: "123",
        postId: "abc-xyz",
      },
    } satisfies RequestConfig<string>;

    const result = substituteParams(url, config);
    expect(result).toBe("/api/users/123/posts/abc-xyz");
  });
});
