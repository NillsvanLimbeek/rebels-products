import { Product } from "@/lib/types/Product";
import { ProductCard } from "./ProductCard";
import { RebelsLogo } from "./RebelsLogo";

interface Props {
  products: Product[];
}

export function ProductList({ products }: Props) {
  if (!products.length) {
    return (
      <div className="flex h-80 w-full items-center justify-center gap-4">
        <RebelsLogo />
        <h1 className="text-2xl font-light">Nothing to see here...</h1>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </ul>
  );
}
