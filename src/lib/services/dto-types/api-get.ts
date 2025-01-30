import { Product } from "@/lib/types/Product";

export type ApiGetResponse = {
  "/products": Product[];
  "/products/{id}": Product;
};
