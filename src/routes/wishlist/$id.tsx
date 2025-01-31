import { GenericList } from "@/components/GenericList";
import { ProductCard } from "@/components/ProductCard";
import { api } from "@/lib/services/api";
import { Product } from "@/lib/types/Product";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

function fetchData(id: string) {
  const products = api.get("/products");
  const wishlist = api.get("/wishlists/{id}", { params: { id } });

  return Promise.all([products, wishlist]);
}

export const Route = createFileRoute("/wishlist/$id")({
  component: RouteComponent,
  loader: (e) => fetchData(e.params.id),
});

function RouteComponent() {
  const [products, wishlist] = Route.useLoaderData();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

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

  return (
    <>
      <h1 className="mb-3 text-4xl">{wishlist.name}</h1>
      <GenericList
        items={wishlistProducts}
        renderItem={(product) => <ProductCard product={product} />}
      />
    </>
  );
}
