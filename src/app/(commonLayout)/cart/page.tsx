import CartItemCard from "@/components/modules/cartPage/cartCard";
import { Button } from "@/components/ui/button";
import { cartService } from "@/services/cart.service";
import { CartItem } from "@/types/cart.type";
import Link from "next/link";

const CartPage = async() => {
    const {data}=await cartService.getCart();
    const {totalPrice,items}=data;
    return (
        <div className="flex flex-col gap-10 px-5 mt-5">
            {
                data && data?.items?.length > 0 ? <div className="flex justify-between items-center">
                <h1>
                <span className="font-bold">Total:</span> {totalPrice} Tk
                </h1>
                <Link href={"/checkout"}>
                <Button>Checkout</Button>
                </Link>
                <div className="flex flex-wrap gap-5">
                {
                    items.map((item:CartItem)=><CartItemCard key={item.id} cartItem={item}></CartItemCard>)
                }
            </div>
            </div>:
            <div className="flex flex-col items-center gap-5">
                <h1 className="text-xl font-bold">Your cart is empty</h1>
                <Link href={"/shop"}><Button>Go to shop</Button></Link>
                </div>
            }
        </div>
    );
};

export default CartPage;