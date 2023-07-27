import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/shared/components/table";

import { Product } from "@/shared/models/product.model";

import { formatCurrency } from "@/shared/utils/format-currency";

interface ProductsTableProps {
  products: Product[];
}

export const ProductsTable = ({ products }: ProductsTableProps) => {
  return (
    <Table className="w-full mt-3">
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} className="capitalize">
            <TableCell>{product.id}</TableCell>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell>{product.brand}</TableCell>
            <TableCell>{formatCurrency(product.price)}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{product.category}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
