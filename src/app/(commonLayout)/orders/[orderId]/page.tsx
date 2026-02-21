import { orderService } from '@/services/orders.service';
import React from 'react';

const OrderItemPage = async () => {
    const {data}=await orderService.getOrders();
        console.log(data);
};

export default OrderItemPage;