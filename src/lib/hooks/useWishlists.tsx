import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Wishlist } from "../types/Wishlist";
import { api } from "../services/api";

interface WishlistContextData {
  wishlists: Wishlist[];
  filteredWishlists: Wishlist[] | null;
  isLoading: boolean;
  error: string | null;
  fetchWishlists: () => void;
  searchWishlists: (search: string) => void;
  clearSearch: () => void;
}

const WishlistsContext = createContext<WishlistContextData | null>(null);

function WishlistsProvider({ children }: { children: ReactNode }) {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [filteredWishlists, setFilteredWishlists] = useState<Wishlist[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchWishlists() {
    try {
      setIsLoading(true);
      const res = await api.get("/wishlists");
      setWishlists(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  function searchWishlists(search: string) {
    if (!search.length) {
      setFilteredWishlists(null);
    }

    const filtered = wishlists.filter((wishlist) =>
      wishlist.name.toLowerCase().includes(search),
    );
    setFilteredWishlists(filtered);
  }

  function clearSearch() {
    setFilteredWishlists(null);
  }

  useEffect(() => {
    fetchWishlists();
  }, []);

  return (
    <WishlistsContext.Provider
      value={{
        wishlists,
        filteredWishlists,
        isLoading,
        error,
        fetchWishlists,
        searchWishlists,
        clearSearch,
      }}
    >
      {children}
    </WishlistsContext.Provider>
  );
}

function useWishlists() {
  const context = useContext(WishlistsContext);

  if (!context)
    throw new Error("useWishlists must be used within WishlistsProvider");

  return context;
}

export { WishlistsProvider, useWishlists };
