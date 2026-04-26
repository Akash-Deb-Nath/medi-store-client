"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";
import Link from "next/link";
import { Eye } from "lucide-react";

interface OrdersTableProps {
  data: Order[];
  role: "CUSTOMER" | "SELLER" | "ADMIN";
}

const ORDER_ROUTES = {
  CUSTOMER: "/orders",
  SELLER: "/seller/orders",
  ADMIN: "/admin/orders",
} as const;

const OrdersTable = ({ data, role }: OrdersTableProps) => {
  const getOrderLink = (orderId: string) => {
    return `${ORDER_ROUTES[role]}/${orderId}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500";
      case "PROCESSING":
        return "bg-blue-500";
      case "SHIPPED":
        return "bg-purple-500";
      case "DELIVERED":
        return "bg-green-600";
      case "CANCELED":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">SL</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell className="text-center font-medium text-muted-foreground">
                {index + 1}
              </TableCell>
              <TableCell className="font-mono text-xs">
                #{order.id.slice(0, 8)}
              </TableCell>

              <TableCell>৳{order.totalPrice}</TableCell>

              <TableCell>
                {new Date(order.orderedAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <Link href={getOrderLink(order.id)}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;