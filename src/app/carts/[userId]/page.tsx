"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { CartProductsTable } from "../components/carts-products-table";

import { useCart } from "@/shared/services/use-cart";

import { formatCurrency } from "@/shared/utils/format-currency";

export default function Carts() {
  const { userId } = useParams();

  const { fetchCartByUserId, carts } = useCart();

  const cartId = carts[0].id;

  const products = carts[0].products;

  function getTotalDiscount(total: number, discountedPrice: number): number {
    return total - discountedPrice;
  }

  useEffect(() => {
    fetchCartByUserId(Number(userId));
  }, [userId]);

  return (
    <div>
      <div>
        <h2 className="font-bold text-lg">Cart {cartId}</h2>
      </div>

      <div className="mt-10">
        <p>Details</p>
        <div className="mt-3 w-full p-6 border border-gray-200 rounded-lg shadow bg-gray-100">
          <div className="grid grid-cols-2">
            <p>User: Test</p>
            <p># of Items: {products.length}</p>
          </div>
          <div className="mt-3 grid grid-cols-2">
            <p>
              Total Discount:{" "}
              {formatCurrency(
                getTotalDiscount(carts[0].total, carts[0].discountedTotal)
              )}
            </p>
            <p>Total Amount: {formatCurrency(carts[0].discountedTotal)}</p>
          </div>
        </div>
      </div>

      <div>
        <CartProductsTable products={products} />
      </div>
    </div>
  );
}
