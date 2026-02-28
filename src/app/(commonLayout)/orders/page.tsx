import OrderCard from "@/components/modules/orderPage/orderCard";
import { Button } from "@/components/ui/button";
import { orderService } from "@/services/orders.service";
import { Order } from "@/types";
import Link from "next/link";

const OrdersPage = async () => {
    const { data } = await orderService.getOrders();
    console.log(data);
    console.log(data?.length);
    return (
        <div className="px-10 flex flex-col gap-5">
            {
                data && data?.length > 0 ? <div  className="flex flex-col justify-center items-center gap-5">
                    <h1 className="text-2xl font-bold">Your orders:</h1>
                    <div  className="flex flex-wrap gap-5">
                        {
                            data.map((order: Order) => {
                                return <OrderCard key={order.id} order={order}>
                                </OrderCard>
                            })
                        }
                    </div>
                </div> :
                    <div className="flex flex-col items-center gap-5 py-10">
                        <h1 className="text-xl font-bold">You don't have any orders.</h1>
                        <Link href={"/shop"}><Button>Go to shop</Button></Link>
                    </div>
            }
        </div>
    );
};

export default OrdersPage;