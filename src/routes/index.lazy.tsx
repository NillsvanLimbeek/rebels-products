import { ProductList } from "@/components/ProductList";
import { Search } from "@/components/Search";
import { useProducts } from "@/lib/hooks/useProducts";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { products, filteredProducts, searchProducts, clearSearch } =
    useProducts();

  return (
    <div className="container mx-auto p-4">
      <Search
        handleSearch={(e) => searchProducts(e)}
        handleClearSearch={clearSearch}
      />

      <ProductList products={filteredProducts || products} />
    </div>
  );
}
