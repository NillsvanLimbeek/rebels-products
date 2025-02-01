import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GenericList } from "./GenericList";

describe("GenericList Component", () => {
  const mockItems = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  const renderItem = (item: (typeof mockItems)[0]) => (
    <div data-testid={`item-${item.id}`}>{item.name}</div>
  );

  it("renders empty state when no items provided", () => {
    render(<GenericList items={[]} renderItem={renderItem} />);
    expect(screen.getByText("Nothing to see here...")).toBeInTheDocument();
  });

  it("renders list of items", () => {
    render(<GenericList items={mockItems} renderItem={renderItem} />);

    mockItems.forEach((item) => {
      expect(screen.getByTestId(`item-${item.id}`)).toBeInTheDocument();
    });
  });
});
