import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table";

import { PRODUCTS } from "@/shared/constants/products";

export default function Products() {
  return (
    <Table className="w-full">
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
        {PRODUCTS.map((product) => (
          <TableRow key={product.id} className="capitalize">
            <TableCell>{product.id}</TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.brand}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{product.category}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
