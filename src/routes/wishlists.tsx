import { GenericList } from "@/components/GenericList";
import { Search } from "@/components/Search";
import { WishlistCard } from "@/components/WishlistCard";
import { useWishlists } from "@/lib/hooks/useWishlists";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/wishlists")({
  component: Wishlists,
});

function Wishlists() {
  const { wishlists, searchWishlists, filteredWishlists, clearSearch } =
    useWishlists();

  return (
    <>
      <Search
        placeholder="Search wishlists"
        handleSearch={(e) => searchWishlists(e)}
        handleClearSearch={clearSearch}
      />

      <GenericList
        items={filteredWishlists || wishlists}
        renderItem={(wishlist) => <WishlistCard wishlist={wishlist} />}
      />
    </>
  );
}
