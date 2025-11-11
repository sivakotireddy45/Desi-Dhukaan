

import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-cyan-400 via-white to-green-400 text-gray-800 overflow-hidden">
      
      {/* Shadow background text */}
      <h1 className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-[12rem] md:text-[18rem] font-bold text-white opacity-10 whitespace-nowrap pointer-events-none select-none z-0">
        DesiDukaan
      </h1>

      {/* Logo */}
      <img
        src={Logo}
        alt="Logo"
        className="z-10 w-28 h-28 mb-6 rounded-full shadow-lg"
      />

      {/* Heading */}
      <h1 className="z-10 text-4xl font-bold text-center">Create new account</h1>
      <p className="z-10 mt-2 text-base">
        Already have an account?
        <Link
          className="ml-2 text-primary font-semibold hover:underline"
          to="/auth/login"
        >
          Login
        </Link>
      </p>

      {/* Form */}
      <div className="z-10 w-full max-w-xl px-4 mt-8">
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default AuthRegister;
