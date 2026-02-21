import { orderService } from "@/services/orders.service";

const OrdersPage =async() => {
    const {data}=await orderService.getOrders();
    console.log(data);
    return (
        <div>
            <h1>This is admin orders page</h1>
        </div>
    );
};

export default OrdersPage;