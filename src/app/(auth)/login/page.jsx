"use client";

import React, { useContext, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import { AuthContext } from "@/Provider/AuthProvider";

export default function LoginPage() {
  const { signIn, googleLogin } = useContext(AuthContext);

  const router = useRouter();
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple password validation
    if (password.length < 6) {
      Swal.fire("Error!", "Password must be at least 6 characters.", "error");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      Swal.fire(
        "Error!",
        "Password must contain at least one uppercase letter.",
        "error"
      );
      return;
    }
    if (!/[a-z]/.test(password)) {
      Swal.fire(
        "Error!",
        "Password must contain at least one lowercase letter.",
        "error"
      );
      return;
    }

    signIn(email, password)
      .then(() => {
        Swal.fire("Success!", "Logged in successfully!", "success");
        router.push("/"); // redirect
      })
      .catch(() => {
        Swal.fire("Error!", "Incorrect email or password!", "error");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire("Success!", "Logged in with Google!", "success");
        router.push("/");
      })
      .catch((err) => {
        Swal.fire("Error!", err.message, "error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="border shadow-2xl rounded-2xl w-full max-w-md flex flex-col overflow-hidden p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Log In BLOOD-CARE!
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              value={email}
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-gray-400 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-3 top-10 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={22} />
              ) : (
                <AiFillEye size={22} />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-center text-gray-400">OR</div>

        <div className="flex justify-center">
          <FcGoogle
            className="cursor-pointer hover:scale-125 transition"
            size={40}
            onClick={handleGoogleLogin}
          />
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
