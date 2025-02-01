import { Wishlist } from "@/lib/types/Wishlist";

export type ApiPostRequest = {
  "/wishlists": Omit<Wishlist, "id">;
};

export type ApiPostResponse = {
  "/wishlists": Wishlist;
};
