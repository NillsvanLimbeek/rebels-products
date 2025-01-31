import { describe, it, expect } from "vitest";
import { formatCamelCase } from "./format-camel-case.ts";

describe("format camel case", () => {
  it("should format simple camelCase string", () => {
    expect(formatCamelCase("helloWorld")).toBe("Hello world");
  });

  it("should format multiple uppercase letters", () => {
    expect(formatCamelCase("helloWorldTest")).toBe("Hello world test");
  });

  it("should handle single word strings", () => {
    expect(formatCamelCase("hello")).toBe("Hello");
  });

  it("should handle empty string", () => {
    expect(formatCamelCase("")).toBe("");
  });
});
