// app/doners/[id]/page.jsx
import Link from "next/link";
import React from "react";

export default async function page({ params }) {
  const { id } = await params;

  // fetch donor using the dynamic id
  const res = await fetch(
    `https://blood-care-server-nine.vercel.app/doners/${id}`,
    {
      cache: "no-store", // ensures fresh fetch every time
    }
  );

  if (!res.ok) {
    return <p className="text-center mt-10 text-red-500">Doner not found</p>;
  }

  const doner = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Back Button */}
      <Link
        href="/alldoners"
        className="-mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </Link>

      {/* Large Image / Banner */}
      <div className="w-full h-80 mb-6 overflow-hidden rounded-lg shadow-lg mt-4">
        <img
          src={doner.imag || "https://i.ibb.co/65RvdFR/blood.jpg"}
          alt={doner.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product / Doner Title */}
      <h1 className="text-4xl font-bold mb-4">Doner Name : {doner.name}</h1>

      {/* Full Description */}
      <p className="text-gray-700 mb-6">location : {doner.location}</p>

      {/* Meta Info */}
      <div className="flex flex-col gap-6 text-gray-600 border-t pt-4 border-gray-200">
        <div>
          <span className="font-semibold">Email : {doner.email} </span>
        </div>
        <div>
          <span className="font-semibold">
            blood Group :{" "}
            <span className="text-red-500">{doner.bloodGroup}</span>
          </span>{" "}
        </div>
        <div>
          <span className="font-semibold">Contact : </span> {doner.phone}
        </div>
        <div>
          <span className="font-semibold">Post By : </span> {doner.addedByName}
        </div>
      </div>
    </div>
  );
}
