"use client";

import { AuthContext } from "@/Provider/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function page() {
  const { user } = useContext(AuthContext);
  const [doners, setDoners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === "loading") return;

    // if NOT logged in → show alert → then redirect
    if (!user?.email) {
      Swal.fire({
        title: "Error!",
        text: "You must be logged in to view your donors.",
        icon: "error",
        confirmButtonText: "Go to Home",
      }).then(() => {
        window.location.href = "/";
      });

      setLoading(false);
      return;
    }

    // fetch donors for this user
    fetch(
      `https://blood-care-server-nine.vercel.app/doners?addedByEmail=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDoners(data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to load donor data.", "error");
        setLoading(false);
      });
  }, [user]);

  if (loading || user === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading your donors...</p>
      </div>
    );
  }

  if (doners.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          You haven't added any donors yet.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Your Doner List</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doners.map((doner) => (
            <div
              key={doner._id}
              className="border rounded-xl shadow-lg p-6 bg-white hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-semibold mb-2">{doner.name}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Email:</span> {doner.email}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Blood Group:</span>{" "}
                {doner.bloodGroup}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Phone:</span> {doner.phone}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Location:</span> {doner.location}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Added By:</span>{" "}
                {doner.addedByName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
