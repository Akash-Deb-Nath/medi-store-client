import OrderCard from "@/components/modules/orderPage/orderCard";
import { orderService } from "@/services/orders.service";
import { Order } from "@/types";

const OrdersPage = async () => {
    const {data}=await orderService.getOrders();
    console.log(data);
    return (
        <div className="px-10 flex flex-col gap-5">
            <h1 className="text-2xl font-bold">Your orders:</h1>
            <div>
                {
                    data.map((order:Order)=>{
                        return <OrderCard key={order.id} order={order}>
                        </OrderCard>
                    })
                }
            </div>
        </div>
    );
};

export default OrdersPage;