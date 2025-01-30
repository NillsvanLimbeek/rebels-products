export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageSearch: string;
  imageUrl: string;
  specifications: Record<string, string>;
}
