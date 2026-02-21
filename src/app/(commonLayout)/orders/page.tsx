import OrderCard from "@/components/modules/orderPage/orderCard";
import { orderService } from "@/services/orders.service";
import { Order } from "@/types";

const OrdersPage = async () => {
    const {data}=await orderService.getOrders();
    console.log(data);
    return (
        <div>
            <h1>Your orders</h1>
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