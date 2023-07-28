interface PaginationInfo  {
  limit: number;
  skip: number;
  total: number;
}

export interface FetchResponseProducts<T> extends PaginationInfo  {
  products: T;
}

export interface FetchResponseCarts<T> extends PaginationInfo  {
  carts: T;
}

export interface FetchResponseUsers<T> extends PaginationInfo  {
  users: T;
}
