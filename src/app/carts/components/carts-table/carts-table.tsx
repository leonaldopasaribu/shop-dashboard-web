import { useRouter } from "next/navigation";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/shared/components/table";
import { Button } from "@/shared/components/button";

import { Cart } from "@/shared/models/cart.model";

import { formatCurrency } from "@/shared/utils/format-currency";

interface CartsTableProps {
  carts: Cart[];
}

export const CartsTable = ({ carts }: CartsTableProps) => {
  const router = useRouter();

  function redirectToCartDetailPage(userId: number): void {
    router.push(`/carts/${userId}`);
  }
  return (
    <Table className="w-full mt-3">
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {carts.map((cart) => (
          <TableRow key={cart.id} className="capitalize">
            <TableCell>{cart.id}</TableCell>
            <TableCell className="font-medium">{cart.userId}</TableCell>
            <TableCell>
              {formatCurrency(cart.total - cart.discountedTotal)}
            </TableCell>
            <TableCell>{formatCurrency(cart.discountedTotal)}</TableCell>
            <TableCell>
              <Button onClick={() => redirectToCartDetailPage(cart.userId)}>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};