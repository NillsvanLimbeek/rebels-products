import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import usePixabay from "./usePixabay";

describe("usePixabay", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return loading state and empty image initially", () => {
    const { result } = renderHook(() => usePixabay("test"));
    expect(result.current.loading).toBe(true);
    expect(result.current.image).toBe("");
  });

  it("should fetch and set image on successful API call", async () => {
    const mockImage = "https://example.com/image.jpg";

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          total: 1,
          hits: [{ webformatURL: mockImage }],
        }),
    });

    const { result } = renderHook(() => usePixabay("test"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.image).toBe(mockImage);
    });
  });

  it("should set placeholder image when no results found", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ total: 0, hits: [] }),
    });

    const { result } = renderHook(() => usePixabay("test"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.image).toBe("https://placehold.co/600");
    });
  });

  it("should handle API errors and set a placeholder image", async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(() => usePixabay("test"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.image).toBe("https://placehold.co/600");
    });
  });

  it("should not fetch if search is empty", () => {
    const fetchSpy = vi.spyOn(global, "fetch");
    renderHook(() => usePixabay(""));

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
