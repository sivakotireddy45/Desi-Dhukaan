




import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-green-50 to-cyan-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-10">
          📦 Desi Dukaan Orders
        </h1>

        {orderList && orderList.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {orderList.map((orderItem) => (
              <Card
                key={orderItem._id}
                className="relative bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 border border-green-100"
              >
                <CardHeader className="pb-0">
                  <CardTitle className="text-lg text-green-800">
                    Order #{orderItem?._id.slice(-6)}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {orderItem?.orderDate.split("T")[0]}
                  </p>
                </CardHeader>

                <CardContent className="mt-4 flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700 font-medium">Status</span>
                    <Badge
                      className={`py-1 px-4 text-white rounded-full text-sm shadow ${
                        orderItem?.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem?.orderStatus === "rejected"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700 font-medium">Total</span>
                    <span className="text-green-700 font-bold text-lg">
                      ${orderItem?.totalAmount}
                    </span>
                  </div>

                  <Dialog
                    open={openDetailsDialog}
                    onOpenChange={() => {
                      setOpenDetailsDialog(false);
                      dispatch(resetOrderDetails());
                    }}
                  >
                    <Button
                      onClick={() => handleFetchOrderDetails(orderItem?._id)}
                      className="mt-3 w-full bg-gradient-to-r from-cyan-400 to-green-400 hover:from-cyan-500 hover:to-green-500 text-white font-medium rounded-xl"
                    >
                      View Details
                    </Button>
                    <AdminOrderDetailsView orderDetails={orderDetails} />
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminOrdersView;
