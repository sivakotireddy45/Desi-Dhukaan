

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-green-100">
      <Card className="w-full max-w-md text-center rounded-2xl shadow-xl border-2 border-cyan-500">
        <CardHeader className="flex flex-col items-center gap-4 py-6">
          <CheckCircle2 className="h-16 w-16 text-green-600 animate-bounce" />
          <CardTitle className="text-3xl font-extrabold text-cyan-800 drop-shadow-sm">
            Payment Successful!
          </CardTitle>
          <p className="text-green-700 text-sm">
            Thank you for shopping at <span className="font-bold text-cyan-700">Desi Dukaan</span> 🎉
          </p>
        </CardHeader>
        <Button
          className="w-[80%] mx-auto mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-full"
          onClick={() => navigate("/shop/account")}
        >
          View My Orders
        </Button>
        <div className="py-4 text-xs text-gray-500 italic">You'll receive an order confirmation shortly</div>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
