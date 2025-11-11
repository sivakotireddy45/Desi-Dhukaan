


import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-cyan-200 to-green-300 relative overflow-hidden">
      {/* Glowing Background Text */}
      <h1 className="absolute z-0 text-[150px] md:text-[200px] font-extrabold text-white opacity-10 select-none inset-0 text-center mt-32">
        Desi Dukaan
      </h1>

      {/* Header */}
      <div className="relative z-10">
        <ShoppingHeader />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col w-full px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;

