import { getSession } from "@/actions/user.action";
import CartItemCard from "@/components/modules/cartPage/cartCard";
import { Button } from "@/components/ui/button";
import { useSessionContext } from "@/contexts/SessionContext";
import { cartService } from "@/services/cart.service";
import { CartItem } from "@/types/cart.type";
import { get } from "http";
import Link from "next/link";
import { redirect } from "next/navigation";

const CartPage = async() => {
    const {data}=await cartService.getCart();
    const totalPrice = data?.totalPrice ?? 0;
    const items = data?.items ?? [];
    const user=await getSession();
    if (user.data===null) {
        redirect("/login");
    }
    return (
        <div className="flex flex-col gap-10 px-5 mt-5">
            {
                data && data?.items?.length > 0 ? <div  className="flex flex-col gap-10 px-5 mt-5">
                    <div className="flex justify-around items-center">
                <h1>
                <span className="font-bold">Total:</span> {totalPrice} Tk
                </h1>
                <Link href={"/checkout"}>
                <Button>Checkout</Button>
                </Link>
                </div>
                <div className="flex flex-wrap justify-center gap-5">
                {
                    items.map((item:CartItem)=><CartItemCard key={item.id} cartItem={item}></CartItemCard>)
                }
                </div>
            </div>
        :
            <div className="flex flex-col items-center gap-5 py-10">
                <h1 className="text-xl font-bold">Your cart is empty</h1>
                <Link href={"/shop"}><Button>Go to shop</Button></Link>
                </div>
            }
        </div>
    );
};

export default CartPage;