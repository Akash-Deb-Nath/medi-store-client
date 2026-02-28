import OrderItemCard from '@/components/modules/orderPage/orderItemCard';
import { orderService } from '@/services/orders.service';
import { OrderItem } from '@/types';

interface OrderItemPageProps {
  params: Promise<{ orderId: string }>;
}

const OrderItemPage = async ({ params }:OrderItemPageProps) => {
      const { orderId } = await params;
    const {data}=await orderService.getOrderById(orderId);
    console.log(data);
    return (
        <div className='flex flex-col gap-3'>
            <div className='px-16 flex flex-col gap-3'>
                <h1 className='text-2xl font-bold my-4'>Order details:</h1>
            <p><span className="font-bold">Total Price:</span> ${data.totalPrice}</p>
            <p><span className="font-bold">Quantity:</span> {data.items.length}</p>
            <p><span className="font-bold">Status:</span> {data.status}</p>
            <p><span className="font-bold">Ordered At:</span> {new Date(data.orderedAt).toLocaleString()}</p>
            <p><span className="font-bold">Ordered items:</span></p>
            </div>
            <div className='flex flex-wrap gap-5 p-10'>
            {
            data.items.map((item:OrderItem)=>{
                return <OrderItemCard key={item.id} orderItem={item}>
                </OrderItemCard>
            })
            }
        </div>
        </div>
    );
};

export default OrderItemPage;