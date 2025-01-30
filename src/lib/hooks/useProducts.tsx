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
  filteredProducts: Product[] | null;
  isLoading: boolean;
  error: string | null;
  searchProducts: (search: string) => void;
  clearSearch: () => void;
}

const ProductsContext = createContext<ProductContextData | null>(null);

function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
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

  function searchProducts(search: string) {
    if (!search.length) {
      setFilteredProducts(null);
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search),
    );
    setFilteredProducts(filtered);
  }

  function clearSearch() {
    setFilteredProducts(null);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        filteredProducts,
        isLoading,
        error,
        searchProducts,
        clearSearch,
      }}
    >
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
