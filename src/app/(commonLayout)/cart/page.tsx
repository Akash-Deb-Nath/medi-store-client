// CartPage (server component)
import { getSession } from "@/actions/user.action";
import CartClient from "@/components/modules/cartPage/cartClient";
import { cartService } from "@/services/cart.service";
import { redirect } from "next/navigation";

const CartPage = async () => {
  const { data } = await cartService.getCart();
  const user = await getSession();

  if (user.data === null) {
    redirect("/login");
  }

  return <CartClient payload={data}/>;
};

export default CartPage;