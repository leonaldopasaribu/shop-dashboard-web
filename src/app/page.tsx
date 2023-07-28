"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

import { Pagination } from "@/shared/components/pagination";

import { useProduct } from "@/shared/services/use-product";
import { useCalculatePagination } from "@/shared/services/use-pagination";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);

  const { fetchProducts, products, total, limit } = useProduct();

  const labels = products.map((product) => product.title);
  const stock = products.map((product) => product.stock);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock",
        data: stock,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const paginationData = {
    totalProducts: total,
    limit: limit,
  };

  const { currentPage, totalPage } = useCalculatePagination(
    paginationData,
    page
  );

  function handlePreviousPage(): void {
    setPage(page - 1);
    setSkip(skip - limit);
  }

  function handleNextPage(): void {
    setPage(page + 1);
    setSkip(skip + limit);
  }

  useEffect(() => {
    fetchProducts(skip);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <h2 className="font-bold">Overview</h2>
      <div className="mt-3 h-[400px] w-full">
        <Bar
          data={data}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>{" "}
      <div className="mt-3">
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </div>
  );
}
