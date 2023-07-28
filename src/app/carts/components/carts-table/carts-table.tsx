import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/shared/components/table";

import { Cart } from "@/shared/models/cart.model";

import { formatCurrency } from "@/shared/utils/format-currency";

interface CartsTableProps {
  carts: Cart[];
}

export const CartsTable = ({ carts }: CartsTableProps) => {
  return (
    <Table className="w-full mt-3">
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Total Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {carts.map((cart) => (
          <TableRow key={cart.id} className="capitalize">
            <TableCell>{cart.id}</TableCell>
            <TableCell className="font-medium">{cart.userId}</TableCell>
            <TableCell>{cart.totalProducts}</TableCell>
            <TableCell>{cart.totalQuantity}</TableCell>
            <TableCell>{formatCurrency(cart.discountedTotal)}</TableCell>
            <TableCell>{formatCurrency(cart.total)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
