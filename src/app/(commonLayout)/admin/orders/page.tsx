import { getSession } from "@/actions/user.action";
import { orderService } from "@/services/orders.service";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OrdersTable from "@/components/modules/orderPage/ordersTable";

const OrdersPage = async () => {
  const user = await getSession();

  if (!user.data) {
    redirect("/login");
  }

  const { data } = await orderService.getAllOrders();

  return (
    <div className="px-6 md:px-10 py-6 space-y-6">

      <h1 className="text-center text-2xl font-bold">All Orders:</h1>

      {!data || data.length === 0 ? (
        <div className="flex flex-col items-center gap-5 py-10">
          <h1 className="text-xl font-semibold">
            No orders found
          </h1>
          <Link href="/shop">
            <Button>Go Shopping</Button>
          </Link>
        </div>
      ) : (
        <OrdersTable data={data} role={user.data?.user.role} />
      )}

    </div>
  );
};

export default OrdersPage;