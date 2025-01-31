import { RebelsLogo } from "./RebelsLogo";

interface GenericListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function GenericList<T extends { id: string | number }>({
  items,
  renderItem,
}: GenericListProps<T>) {
  if (!items.length) {
    return (
      <div className="flex h-80 w-full items-center justify-center gap-4">
        <RebelsLogo />
        <h1 className="text-2xl font-light">Nothing to see here...</h1>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
