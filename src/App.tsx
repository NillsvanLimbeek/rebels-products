import { useProducts } from "@/lib/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";

function App() {
  const { products, isLoading } = useProducts();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="container mx-auto p-4">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ul>
    </div>
  );
}

export default App;
