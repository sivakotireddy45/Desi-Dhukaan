
import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({ title: data?.payload?.message });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[650px] bg-gradient-to-br from-cyan-50 via-green-50 to-cyan-100 rounded-2xl shadow-xl p-6">
      {/* Order Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <h2 className="text-lg font-bold text-green-700 mb-3">📄 Order Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Order ID</span>
            <Label className="text-gray-900">{orderDetails?._id}</Label>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Order Date</span>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Order Price</span>
            <Label className="text-green-700 font-bold">
              ${orderDetails?.totalAmount}
            </Label>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Payment Method</span>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Payment Status</span>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Order Status</span>
            <Badge
              className={`py-1 px-3 rounded-full text-white shadow-md ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-gradient-to-r from-green-400 to-green-600"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-gradient-to-r from-red-500 to-red-700"
                  : "bg-gradient-to-r from-gray-500 to-gray-700"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <h2 className="text-lg font-bold text-green-700 mb-3">🛍 Order Items</h2>
        <ul className="divide-y divide-gray-100">
          {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
            orderDetails.cartItems.map((item, idx) => (
              <li
                key={idx}
                className={`flex justify-between py-2 ${
                  idx % 2 === 0 ? "bg-gray-50 rounded-lg px-2" : "px-2"
                }`}
              >
                <span className="text-gray-700">{item.title}</span>
                <span className="text-gray-500">Qty: {item.quantity}</span>
                <span className="font-medium text-green-700">${item.price}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-sm">No items found.</li>
          )}
        </ul>
      </div>

      {/* Shipping Info */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <h2 className="text-lg font-bold text-green-700 mb-3">📦 Shipping Info</h2>
        <div className="text-sm text-gray-700 space-y-1">
          <span>{user.userName}</span>
          <span>{orderDetails?.addressInfo?.address}</span>
          <span>{orderDetails?.addressInfo?.city}</span>
          <span>{orderDetails?.addressInfo?.pincode}</span>
          <span>{orderDetails?.addressInfo?.phone}</span>
          <span>{orderDetails?.addressInfo?.notes}</span>
        </div>
      </div>

      {/* Update Form */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <CommonForm
          formControls={[
            {
              label: "Order Status",
              name: "status",
              componentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inProcess", label: "In Process" },
                { id: "inShipping", label: "In Shipping" },
                { id: "delivered", label: "Delivered" },
                { id: "rejected", label: "Rejected" },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Update Order Status"}
          onSubmit={handleUpdateStatus}
        />
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
