// import "./App.css";

import { useProducts } from "@/lib/hooks/useProducts";

function App() {
  const { products, isLoading } = useProducts();

  if (isLoading) return <h1>Loading...</h1>;

  return <>{JSON.stringify(products, null, 2)}</>;
}

export default App;
