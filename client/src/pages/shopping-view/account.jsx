
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import { Sparkles } from "lucide-react";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      {/* Background Image */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          alt="Account Header"
          className="h-full w-full object-cover object-center filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Tabs with Glassmorphism */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="bg-white/10 backdrop-blur-lg border border-cyan/20 rounded-2xl shadow-xl p-6">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="flex justify-center space-x-6 bg-gray/20 backdrop-blur-md p-2 rounded-full border border-cyan/30 shadow-inner">
              <TabsTrigger
                value="orders"
                className="data-[state=active]:bg-cyan-300/20 data-[state=active]:text-cyan-400 px-6 py-2 rounded-full transition-all text-black"
              >
                🧾 Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="data-[state=active]:bg-emerald-300/20 data-[state=active]:text-emerald-400 px-6 py-2 rounded-full transition-all text-black"
              >
                📍 Address
              </TabsTrigger>
            </TabsList>

            {/* Orders Section */}
            <TabsContent value="orders" className="pt-6">
              <ShoppingOrders />
            </TabsContent>

            {/* Address Section */}
            <TabsContent value="address" className="pt-6">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
