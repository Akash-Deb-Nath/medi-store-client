import { cartService } from "@/services/cart.service";

const CartPage = async() => {
    const {data}=await cartService.getCarts();
    console.log(data);
    return (
        <div>
            <h1>This is cart</h1>
        </div>
    );
};

export default CartPage;