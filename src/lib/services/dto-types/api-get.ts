import { Product } from "@/lib/types/Product";
import { Wishlist } from "@/lib/types/Wishlist";

export type ApiGetResponse = {
  "/products": Product[];
  "/products/{id}": Product;
  "/wishlists": Wishlist[];
  "/wishlists/{id}": Wishlist;
};
