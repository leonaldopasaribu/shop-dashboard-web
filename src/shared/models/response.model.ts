export interface FetchResponseProducts<T> {
  products: T;
  limit: number;
  skip: number;
  total: number;
}
