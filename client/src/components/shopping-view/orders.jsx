


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Badge } from "../ui/badge";
import ShoppingOrderDetailsView from "./order-details";
import { CalendarCheck, Wallet, PackageSearch, FileText } from "lucide-react";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-cyan-600 text-white";
      case "rejected":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-slate-100 to-slate-200 shadow-md border border-slate-300">
        <CardHeader>
          <CardTitle className="text-cyan-700 text-xl font-semibold">
            🛍️ Your Orders
          </CardTitle>
        </CardHeader>
      </Card>

      {orderList && orderList.length > 0 ? (
        orderList.map((orderItem) => (
          <Card
            key={orderItem._id}
            className="bg-white border border-slate-300 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <CardHeader className="flex flex-row justify-between items-center px-6 py-4 bg-slate-100 border-b">
              <div className="text-slate-700 font-medium text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-600" />
                Order ID: {orderItem._id}
              </div>
              <Badge className={`${getStatusColor(orderItem.orderStatus)} px-3 py-1 rounded-full text-sm`}>
                {orderItem.orderStatus}
              </Badge>
            </CardHeader>
            <CardContent className="px-6 py-4 space-y-2">
              <div className="flex items-center gap-3 text-slate-600">
                <CalendarCheck className="w-4 h-4 text-cyan-500" />
                <span>Placed on: {orderItem.orderDate.split("T")[0]}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Wallet className="w-4 h-4 text-cyan-500" />
                <span>Total Amount: ${orderItem.totalAmount}</span>
              </div>
              <div className="mt-4">
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={() => {
                    setOpenDetailsDialog(false);
                    dispatch(resetOrderDetails());
                  }}
                >
                  <Button
                    variant="outline"
                    className="border-cyan-600 text-cyan-700 hover:bg-cyan-100"
                    onClick={() => dispatch(getOrderDetails(orderItem._id))}
                  >
                    <PackageSearch className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <ShoppingOrderDetailsView orderDetails={orderDetails} />
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500">No orders found ☔</p>
      )}
    </div>
  );
}

export default ShoppingOrders;
