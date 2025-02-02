import { Button } from "@/components/Button";
import { GenericList } from "@/components/GenericList";
import { ProductCard } from "@/components/ProductCard";
import { useWishlists } from "@/lib/hooks/useWishlists";
import { api } from "@/lib/services/api";
import { Product } from "@/lib/types/Product";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

function fetchData(id: string) {
  const products = api.get("/products");
  const wishlist = api.get("/wishlists/{id}", { params: { id } });

  return Promise.all([products, wishlist]);
}

export const Route = createFileRoute("/wishlist/$id")({
  component: WishlistDetail,
  loader: (e) => fetchData(e.params.id),
});

function WishlistDetail() {
  const { id } = Route.useParams();
  const [products, wishlist] = Route.useLoaderData();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const navigate = useNavigate({ from: "/wishlist/$id" });
  const { fetchWishlists } = useWishlists();

  function findProductsByIds(ids: number[], products: Product[]) {
    const matchingProducts: Product[] = [];

    for (const id of ids) {
      const product = products.find((product) => product.id === String(id));
      if (product) {
        matchingProducts.push(product);
      }
    }

    return matchingProducts;
  }

  useEffect(() => {
    if (products && wishlist) {
      const wishlistProducts = findProductsByIds(wishlist.products, products);
      setWishlistProducts(wishlistProducts);
    }
  }, [products, wishlist]);

  async function handleDeleteWishlist() {
    await api.delete("/wishlists/{id}", { params: { id } });
    navigate({ to: "/wishlists" });
    fetchWishlists();
  }

  async function handleRemoveFromWishlist(id: string) {
    const products = wishlistProducts.filter((product) => product.id !== id);

    setWishlistProducts(products);

    await api.put(
      "/wishlists/{id}",
      { ...wishlist, products: products.map((product) => Number(product.id)) },
      { params: { id: wishlist.id } },
    );
    fetchWishlists();
  }

  return (
    <>
      <div className="mb-3 flex items-center gap-5">
        <h1 className="text-4xl">{wishlist.name}</h1>
        <Button
          testid="delete-wishlist"
          label="Delete wishlist"
          onClick={handleDeleteWishlist}
        />
      </div>

      <GenericList
        items={wishlistProducts}
        renderItem={(product) => (
          <ProductCard
            product={product}
            removeFromWishlist
            handleRemoveFromWishlist={(e) => handleRemoveFromWishlist(e)}
          />
        )}
      />
    </>
  );
}
