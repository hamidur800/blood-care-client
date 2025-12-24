"use client";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Provider/AuthProvider";
import Link from "next/link";

export default function AddDoner() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleAddDoner = (e) => {
    e.preventDefault();
    const form = e.target;

    const donerData = {
      name: form.name.value,
      email: form.email.value,
      bloodGroup: form.bloodGroup.value,
      phone: form.phone.value,
      location: form.location.value,
      addedBy: user?.email,
      addedByName: user?.displayName,
      createdAt: new Date(),
    };

    fetch("https://blood-care-server-eight.vercel.app/doners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donerData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Doner Added!",
          text: "Doner information has been successfully saved.",
          confirmButtonColor: "#6366f1",
        });
        form.reset();
        router.push("/alldoners");
      })
      .catch((err) => {
        Swal.fire("Error!", err.message, "error");
      });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        {" "}
        <p className="text-center text-red-500 text-lg">
          You must be logged in to add a doner.{" "}
        </p>{" "}
        <Link
          href="/login"
          className="btn ml-2 text-white bg-blue-500 underline"
        >
          Please Loged In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      {" "}
      <div className="w-11/12 md:w-3/5 mx-auto rounded-3xl shadow-2xl p-8 border">
        {" "}
        <h2 className="text-3xl font-bold text-center mb-8">Add New Doner</h2>
        <form onSubmit={handleAddDoner} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="name"
              type="text"
              placeholder="Doner Name"
              className="input input-bordered w-full"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Doner Email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="bloodGroup"
              type="text"
              placeholder="Blood Group (A+, B-, etc.)"
              className="input input-bordered w-full"
              required
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              required
            />
          </div>

          <input
            name="location"
            type="text"
            placeholder="Location"
            className="input input-bordered w-full"
            required
          />

          <div className="grid md:grid-cols-2 gap-6">
            <input
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full cursor-not-allowed"
            />
            <input
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
          >
            Add Doner
          </button>
        </form>
      </div>
    </div>
  );
}
