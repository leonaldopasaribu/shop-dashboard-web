"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { CartProductsTable } from "../components/carts-products-table";

import { useCart } from "@/shared/services/use-cart";
import { useUser } from "@/shared/services/use-user";

import { LoadingScreen } from "@/shared/components/loading-screen";

import { formatCurrency } from "@/shared/utils/format-currency";

import { User } from "@/shared/models/user.model";

export default function Carts() {
  const { userId } = useParams();

  const { fetchCartByUserId, carts, isLoading } = useCart();
  const { fetchUsers, users } = useUser();

  const cartId = carts[0]?.id;

  const products = carts[0]?.products;

  function filterUserById(userId: number): User[] {
    return users.filter((item) => Number(item.id) === userId);
  }

  function getUserName(userId: number): any {
    const filteredUsers = filterUserById(userId);

    return filteredUsers[0]?.firstName;
  }

  function getTotalDiscount(total: number, discountedPrice: number): number {
    return total - discountedPrice;
  }

  useEffect(() => {
    fetchCartByUserId(Number(userId));
  }, [userId]);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div>
        <h2 className="font-bold text-lg">Cart {cartId}</h2>
      </div>

      <div className="mt-10">
        <p>Details</p>
        <div className="mt-3 w-full p-6 border border-gray-200 rounded-lg shadow bg-gray-100">
          <div className="grid grid-cols-2">
            <p>User: {getUserName(carts[0]?.userId)}</p>
            <p># of Items: {products?.length}</p>
          </div>
          <div className="mt-3 grid grid-cols-2">
            <p>
              Total Discount:{" "}
              {isNaN(carts[0]?.total && carts[0]?.discountedTotal)
                ? 0
                : formatCurrency(
                    getTotalDiscount(carts[0]?.total, carts[0]?.discountedTotal)
                  )}
            </p>
            <p>
              Total Amount{" "}
              {isNaN(carts[0]?.discountedTotal)
                ? 0
                : formatCurrency(
                    getTotalDiscount(carts[0]?.total, carts[0]?.discountedTotal)
                  )}
            </p>
          </div>
        </div>
      </div>

      <div>
        <CartProductsTable products={products} />
      </div>
    </div>
  );
}
