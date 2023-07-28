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
import { User } from "@/shared/models/user.model";

import { formatCurrency } from "@/shared/utils/format-currency";
import { useEffect } from "react";

interface CartsTableProps {
  carts: Cart[];
  users: User[];
}

export const CartsTable = ({ carts, users }: CartsTableProps) => {
  const router = useRouter();

  function filterUserById(userId: number): User[] {
    return users.filter((item) => Number(item.id) === userId);
  }

  function getUserName(userId: number): any {
    const filteredUsers = filterUserById(userId);

    return filteredUsers[0]?.firstName;
  }

  function redirectToCartDetailPage(userId: number): void {
    router.push(`/carts/${userId}`);
  }

  return (
    <Table className="w-full">
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
            <TableCell className="font-medium">
              {getUserName(cart.userId)}
            </TableCell>
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
