"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AllDoners() {
  const [doners, setDoners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://blood-care-server-eight.vercel.app/doners")
      .then((res) => res.json())
      .then((data) => {
        setDoners(data);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire("Error!", "Failed to fetch doners data.", "error");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {" "}
        <p className="text-lg text-gray-500">Loading Doners...</p>{" "}
      </div>
    );
  }

  //  Delete Property
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://blood-care-server-nine.vercel.app//doners/${id}`, {
          // <-- use the id parameter
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Deleted!", data.message, "success");
              // Remove deleted donor from state
              setDoners((prev) => prev.filter((doner) => doner._id !== id));
            } else {
              Swal.fire("Error!", "Failed to delete donor", "error");
            }
          })
          .catch(() => Swal.fire("Error!", "Something went wrong", "error"));
      }
    });
  };

  return (
    <div className="min-h-screen py-12">
      {" "}
      <div className="w-11/12 md:w-4/5 mx-auto">
        {" "}
        <h2 className="text-3xl font-bold text-center mb-8">All Doners</h2>
        {doners.length === 0 ? (
          <p className="text-center text-gray-500">No doners found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doners.map((doner) => (
              <div
                key={doner._id}
                className="flex flex-col hover:shadow-xl hover:shadow-gradient transition-all border  duration-200 rounded-xl "
              >
                <div className="flex flex-col justify-between flex-grow p-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      Name : {doner.name}
                    </h3>
                    <p className=" text-lg mb-1">
                      <span className="text-lg font-semibold">location :</span>{" "}
                      {doner.location}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="text-lg font-semibold">
                        Blood Group :
                      </span>
                      <span className="text-lg font-semibold text-rose-500">
                        {doner.bloodGroup}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-lg font-bold text-rose-500">
                      <span className="text-lg text-black font-semibold">
                        Contact :
                      </span>{" "}
                      {doner.addedBy}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <Link
                      href={`doner-details/${doner._id}`}
                      className="btn btn-sm btn-primary text-white"
                    >
                      View Details
                    </Link>

                    <button
                      className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => handleDelete(doner._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
