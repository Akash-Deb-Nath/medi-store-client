import OrderCard from "@/components/modules/orderPage/orderCard";
import { orderService } from "@/services/orders.service";
import { Order } from "@/types";

const OrdersPage =async() => {
    const {data}=await orderService.getAllOrders();
    return (
        <div className="px-10 flex flex-col justify-center items-center gap-10 my-10">
                    <h1 className="text-2xl font-bold">All orders:</h1>
                    <div className="flex justify-center items-center gap-5">
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