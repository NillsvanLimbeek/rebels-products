import { useProducts } from "@/lib/hooks/useProducts";
import { ProductList } from "./components/ProductList";
import { Search } from "./components/Search";

function App() {
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

export default App;
