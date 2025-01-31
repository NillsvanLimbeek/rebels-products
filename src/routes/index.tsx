import { ProductCard } from "@/components/ProductCard";
import { GenericList } from "@/components/GenericList";
import { Search } from "@/components/Search";
import { useProducts } from "@/lib/hooks/useProducts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { products, filteredProducts, searchProducts, clearSearch } =
    useProducts();

  return (
    <>
      <Search
        placeholder="Search for products"
        handleSearch={(e) => searchProducts(e)}
        handleClearSearch={clearSearch}
      />

      <GenericList
        items={filteredProducts || products}
        renderItem={(product) => <ProductCard product={product} />}
      />
    </>
  );
}
