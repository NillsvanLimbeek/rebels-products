export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  image: string;
  specifications: Record<string, string>;
}
