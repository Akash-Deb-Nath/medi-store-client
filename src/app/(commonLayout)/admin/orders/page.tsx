import OrderCard from "@/components/modules/orderPage/orderCard";
import { orderService } from "@/services/orders.service";
import { Order } from "@/types";

const OrdersPage =async() => {
    const {data}=await orderService.getAllOrders();
    return (
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
                        </div>:
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