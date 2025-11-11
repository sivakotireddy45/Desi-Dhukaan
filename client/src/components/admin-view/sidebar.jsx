
import {
  Home,
  Package,
  Receipt,
} from "lucide-react"; // New icons
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import desiLogo from "@/assets/logo.png"; // Your logo path

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <Home />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Package />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <Receipt />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex cursor-pointer text-xl items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-100 hover:to-green-100 hover:text-green-800 transition-colors"
        >
          {menuItem.icon}
          <span className="font-medium">{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-64 bg-gradient-to-b from-cyan-50 via-green-50 to-cyan-100"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b border-green-100">
              <SheetTitle
                className="flex gap-3 mt-5 mb-5 items-center cursor-pointer"
                onClick={() => navigate("/admin/dashboard")}
              >
                <img
                  src={desiLogo}
                  alt="Desi Dukaan"
                  className="w-10 h-10 rounded-lg shadow"
                />
                <h1 className="text-xl font-extrabold text-green-800">
                  Desi Dukaan
                </h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-gradient-to-b from-cyan-50 via-green-50 to-cyan-100 p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-3 mb-6"
        >
          <img
            src={desiLogo}
            alt="Desi Dukaan"
            className="w-12 h-12 rounded-lg shadow"
          />
          <h1 className="text-xl font-extrabold text-green-800">
            Desi Dukaan
          </h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;


