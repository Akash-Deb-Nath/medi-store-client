import OrderItemCard from '@/components/modules/orderPage/orderItemCard';
import { orderService } from '@/services/orders.service';
import { OrderItem } from '@/types';

const OrderItemPage = async () => {
    const {data}=await orderService.getOrders();
    console.log(data);
    return (
        <div className='flex flex-wrap gap-5 p-10'>
            {
            data[0].items.map((item:OrderItem)=>{
                return <OrderItemCard key={item.id} orderItem={item}>
                </OrderItemCard>
            })
            }
        </div>
    );
};

export default OrderItemPage;