

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md bg-gradient-to-br from-cyan-300/30 to-green-300/30 backdrop-blur-xl border border-white/20 shadow-lg text-black">
      <SheetHeader>
        <SheetTitle className="text-black">Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <UserCartItemsContent key={item?.productId} cartItem={item} />
            ))
          : <p className="text-center text-sm text-black">No items in cart.</p>}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between text-black font-semibold">
          <span>Total</span>
          <span>${totalCartAmount.toFixed(2)}</span>
        </div>
      </div>

      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6 bg-white/20 hover:bg-white/30 text-black border border-white/30 backdrop-blur rounded-xl"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
