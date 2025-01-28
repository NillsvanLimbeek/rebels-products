import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "../types/Product";
import { api } from "../services/api";

interface ProductContextData {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const ProductsContext = createContext<ProductContextData | null>(null);

function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProjects() {
    try {
      setIsLoading(true);
      const res = await api.get("/products");
      setProducts(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, isLoading, error }}>
      {children}
    </ProductsContext.Provider>
  );
}

function useProducts() {
  const context = useContext(ProductsContext);

  if (!context)
    throw new Error("useProjects must be used within ProductsProvider");

  return context;
}

export { ProductsProvider, useProducts };
