import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  let navigate = useNavigate();
  let [show, setShow] = useState(false);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-br from-[#e0f7fa] to-[#b2ebf2] flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-2xl flex flex-col gap-[30px]">
        
        {/* Header */}
        <div className="w-full h-[200px] bg-gradient-to-r from-[#20c7ff] to-[#00bcd4] rounded-b-[30%] shadow-lg flex items-center justify-center">
          <h1 className="text-gray-700 font-bold text-[22px] tracking-wide">
            Login to <span className="text-white font-extrabold">RSB2Chat</span>
          </h1>
        </div>

        {/* Form */}
        <form className="w-full flex flex-col gap-[20px] items-center px-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full max-w-[90%] h-[55px] border-2 border-[#00bcd4] px-4 py-2 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#20c7ff] transition duration-300"
          />

          <div className="relative w-[90%] h-[50px] border-2 border-[#00bcd4] overflow-hidden rounded-lg shadow-md bg-white flex items-center">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full h-full px-4 bg-white text-gray-700 focus:outline-none"
            />
            <span
              className="absolute right-3 cursor-pointer text-xl text-[#00bcd4] hover:text-[#20c7ff] transition"
              onClick={() => setShow((prev) => !prev)}
              title={show ? "Hide Password" : "Show Password"}
            >
              {show ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button
            type="submit"
            className="mt-2 w-full max-w-[90%] h-[50px] bg-[#20c7ff] hover:bg-[#00acc1] text-white font-semibold rounded-lg transition duration-300 shadow-md"
          >
            Login
          </button>

          <p
            className="text-sm text-gray-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Want to create a new account ?{" "}
            <span className="text-[#20c7ff] hover:underline font-medium">
              SignUp
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
