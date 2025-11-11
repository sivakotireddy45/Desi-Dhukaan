


import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[650px] bg-[#fffdf7] rounded-xl shadow-lg p-6">
      <div className="space-y-6">
        {/* Order Summary Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#0a6847]">🛍️ Order Summary</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Order ID</p>
              <Label className="text-[#2f4858]">{orderDetails?._id}</Label>
            </div>
            <div>
              <p className="text-muted-foreground">Order Date</p>
              <Label className="text-[#2f4858]">
                {orderDetails?.orderDate?.split("T")[0]}
              </Label>
            </div>
            <div>
              <p className="text-muted-foreground">Total Amount</p>
              <Label className="text-[#2f4858]">${orderDetails?.totalAmount}</Label>
            </div>
            <div>
              <p className="text-muted-foreground">Payment Method</p>
              <Label className="text-[#2f4858]">{orderDetails?.paymentMethod}</Label>
            </div>
            <div>
              <p className="text-muted-foreground">Payment Status</p>
              <Label className="text-[#2f4858]">{orderDetails?.paymentStatus}</Label>
            </div>
            <div>
              <p className="text-muted-foreground">Order Status</p>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`rounded-full px-4 py-1 text-white text-xs font-semibold shadow-md relative before:absolute before:-left-2 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:rounded-full before:bg-white
                  ${
                    orderDetails?.orderStatus === "confirmed"
                      ? "bg-green-500 before:border-green-600"
                      : orderDetails?.orderStatus === "rejected"
                      ? "bg-red-600 before:border-red-700"
                      : "bg-gray-700 before:border-gray-800"
                  }`}
                >
                  {orderDetails?.orderStatus}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Cart Items Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-[#0a6847]">🧾 Items in this Order</h2>
          <ul className="space-y-2">
            {orderDetails?.cartItems && orderDetails.cartItems.length > 0
              ? orderDetails.cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row justify-between border rounded-md p-3 bg-[#f4faf8]"
                  >
                    <span className="text-sm text-[#2f4858]">
                      <strong>Title:</strong> {item.title}
                    </span>
                    <span className="text-sm text-[#2f4858]">
                      <strong>Qty:</strong> {item.quantity}
                    </span>
                    <span className="text-sm text-[#2f4858]">
                      <strong>Price:</strong> ₹{item.price}
                    </span>
                  </li>
                ))
              : <p className="text-muted-foreground">No items found</p>}
          </ul>
        </div>

        <Separator />

        {/* Shipping Info */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-[#0a6847]">📦 Shipping Information</h2>
          <div className="grid gap-0.5 text-sm text-[#2f4858]">
            <span><strong>Name:</strong> {user.userName}</span>
            <span><strong>Address:</strong> {orderDetails?.addressInfo?.address}</span>
            <span><strong>City:</strong> {orderDetails?.addressInfo?.city}</span>
            <span><strong>Pincode:</strong> {orderDetails?.addressInfo?.pincode}</span>
            <span><strong>Phone:</strong> {orderDetails?.addressInfo?.phone}</span>
            <span><strong>Notes:</strong> {orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
