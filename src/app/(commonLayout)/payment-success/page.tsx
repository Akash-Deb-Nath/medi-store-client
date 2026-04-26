'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PaymentSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardContent className="pt-8 pb-6 space-y-4">

          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Payment Successful 🎉
          </h1>

          <p className="text-gray-600">
            Your order has been placed successfully.
          </p>

          <p className="text-sm text-gray-500">
            We are processing your order now.
          </p>

          <div className="pt-4 flex flex-col gap-2">
            <Button onClick={() => router.push('/orders')}>
              View Orders
            </Button>

            <Button variant="outline" onClick={() => router.push('/shop')}>
              Continue Shopping
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;