import OrderCard from '@/components/modules/orderPage/orderCard';
import { orderService } from '@/services/orders.service';
import { Order } from '@/types';

const OrdersPage = async () => {
    const {data}=await orderService.getOrders();
    return (
        <div className='flex flex-col justify-center items-center gap-5 p-5'>
                    {data&&data.length>0?<div className="px-10 flex flex-col justify-center items-center gap-5">
                    <h1 className="text-2xl font-bold">Orders:</h1>
                    <div className='flex justify-center items-center gap-5'>
                        {
                            data.map((order:Order)=>{
                                return <OrderCard key={order.id} order={order}>
                                </OrderCard>
                            })
                        }
                    </div>
                </div>:<div className="flex flex-col items-center gap-5 py-10">
                        <h1 className="text-xl font-bold">Ther are no orders.</h1>
                        </div>}
                        </div>
    );
};

export default OrdersPage;