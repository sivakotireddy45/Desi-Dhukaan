
import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { Link } from "react-router-dom";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-cyan-100 via-teal-100 to-green-100">
      {/* Left: Logo & Menu Button */}
      <div className="flex items-center gap-3">
        <Button
          onClick={() => setOpen(true)}
          className="lg:hidden sm:block p-2 rounded-md bg-white/60 hover:bg-white/80"
        >
          <AlignJustify />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        {/* Logo */}
        <Link to="/admin" className="flex items-center gap-2">
          <span className="text-lg font-bold text-green-700 tracking-wide">
            Admin Panel
          </span>
        </Link>
      </div>

      {/* Right: Logout */}
      <div className="flex items-center gap-3">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-white/80 text-black hover:bg-black hover:text-white transition-colors duration-200"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;

