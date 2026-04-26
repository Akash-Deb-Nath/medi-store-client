"use client";

import { orderService } from '@/services/orders.service';
import { useRouter } from 'next/navigation';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from 'react';
import { updateOrderStatus } from '@/actions/order.action';

export default function StatusUpdate({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (value: string) => {
        if (!value) return;

        setLoading(true);
        try {
            await updateOrderStatus(orderId, value);
            toast.success("Status updated!");
            router.refresh(); 
        } catch (error) {
            toast.error("Failed to update status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Select 
            defaultValue={currentStatus} 
            onValueChange={(value) => value && handleUpdate(value)}
            disabled={loading}
        >
            <SelectTrigger className="w-[180px] ml-4">
                <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PROCESSING">Processing</SelectItem>
                <SelectItem value="SHIPPED">Shipped</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
        </Select>
    );
}