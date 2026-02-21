import CheckoutCard from '@/components/modules/checkoutPage/checkoutCard';
import { cartService } from '@/services/cart.service';

const CheckoutPage = async() => {
const {data}=await cartService.getCart();
        return (    
        <div className='flex justify-center p-10'>
            <CheckoutCard key={data.id} cartData={data} />
        </div>
    );
};

export default CheckoutPage;