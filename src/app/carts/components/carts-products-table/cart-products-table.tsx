import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table";

import { Product } from "@/shared/models/product.model";

import { formatCurrency } from "@/shared/utils/format-currency";

interface CartProductsTableProps {
  products: Product[];
}

export const CartProductsTable = ({ products }: CartProductsTableProps) => {
  function getTotalDiscount(
    total: number | undefined,
    discountedPrice: number
  ): number {
    const result = (total ?? 0) - discountedPrice;

    return result;
  }

  return (
    <div>
      <Table className="w-full mt-3">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Total Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, id) => (
            <TableRow key={product.id} className="capitalize">
              <TableCell>{id + 1}</TableCell>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>
                {formatCurrency(
                  getTotalDiscount(product.total, product.discountedPrice ?? 0)
                )}
              </TableCell>
              <TableCell>
                {formatCurrency(product.discountedPrice ?? 0)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartProductsTable;
