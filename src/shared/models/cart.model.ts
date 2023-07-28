import { Product } from "./product.model";

export interface Cart {
  id: string;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}
