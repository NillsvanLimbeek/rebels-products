import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "./Search";

describe("Search Component", () => {
  const mockHandleSearch = vi.fn();
  const mockHandleClearSearch = vi.fn();
  const placeholder = "Search items...";

  beforeEach(() => {
    vi.clearAllMocks();

    render(
      <Search
        handleSearch={mockHandleSearch}
        handleClearSearch={mockHandleClearSearch}
        placeholder={placeholder}
      />,
    );
  });

  it("renders correctly with initial state", () => {
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: "test search" } });
    expect(input).toHaveValue("test search");
  });

  it("shows clear button when input has value", () => {
    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: "test search" } });
    expect(screen.getByTestId("clear")).toBeInTheDocument();
  });

  it("clears input when clear button is clicked", () => {
    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: "test search" } });
    fireEvent.click(screen.getByTestId("clear"));

    expect(input).toHaveValue("");
    expect(mockHandleClearSearch).toHaveBeenCalledTimes(1);
  });

  it("calls handleSearch with input value on form submission", () => {
    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: "test search" } });
    fireEvent.submit(screen.getByTestId("form"));

    expect(mockHandleSearch).toHaveBeenCalledWith("test search");
    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
  });
});
