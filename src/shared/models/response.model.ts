export interface FetchResponseProducts<T> {
  products: T;
  limit: number;
  skip: number;
  total: number;
}

export interface FetchResponseCarts<T> {
  carts: T;
  limit: number;
  skip: number;
  total: number;
}
