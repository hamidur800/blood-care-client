"use client";
import Image from "next/image";
import logo from "../../public/baner.png";
import Link from "next/link";
import { LuUsers } from "react-icons/lu";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import Testimonials from "@/component/Testimonials/Testimonials";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
export default function Home() {
  const [doners, setDoners] = useState([]);
  useEffect(() => {
    fetch("https://blood-care-server-nine.vercel.app/doners")
      .then((res) => res.json())
      .then((data) => {
        setDoners(data);
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to fetch donors.", "error");
      });
  }, []);
  const previewDoners = doners.slice(0, 6);
  return (
    <div>
      {/* Hero section st */}
      <section className="relative">
        <div className="relative h-[80vh] w-full">
          <Image
            src={logo}
            alt="Hero Image"
            fill
            loading="lazy"
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-start text-white bg-black/30">
          <div className="w-11/12 mx-auto md:w-8/12 mb-14">
            <h1 className="text-4xl md:text-6xl font-bold">
              Donate Blood, Save a Life
            </h1>
            <p className="text-xl md:text-2xl font-normal my-6">
              Help us bring smiles and save lives — one donor at a time.
            </p>
          </div>

          <div className="w-11/12 mx-auto md:w-8/12">
            <Link
              href="/alldoner"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md text-lg font-semibold"
            >
              Add New Donor
            </Link>
          </div>
        </div>
      </section>

      {/* Hero section end */}

      {/* Doner List st */}
      <section>
        <div className="py-12 w-11/12 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Recent Doners</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewDoners.map((doner) => (
              <div
                key={doner._id || doner.email}
                className=" rounded-xl shadow-lg p-6 bg-zinc-50 hover:border hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-semibold mb-2">{doner.name}</h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Blood Group:</span>{" "}
                  {doner.bloodGroup}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Location:</span>{" "}
                  {doner.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Doner List end */}

      {/* We're a network of st */}
      <section className="py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            We're a network of
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {/* Donors */}
          <div className="flex flex-col items-center gap-4">
            <LuUsers className="h-12 w-12" />
            <p className="text-2xl font-bold text-gray-900">998+ Donors</p>
          </div>

          {/* Districts */}
          <div className="flex flex-col items-center gap-4">
            <MdOutlineLocationOn className="h-12 w-12" />
            <p className="text-2xl font-bold text-gray-900">64 Districts</p>
          </div>

          {/* Blood Groups */}
          <div className="flex flex-col items-center gap-4">
            <FaBoxes className="h-12 w-12" />
            <p className="text-2xl font-bold text-gray-900">8 Blood Groups</p>
          </div>
        </div>
      </section>
      {/* We're a network of end */}

      {/* What is BloodCare? st */}
      <section className="bg-gray-50 py-20">
        {/* Top Wave Image */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            What is BloodCare?
          </h2>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Section */}
          <div>
            <p className="text-gray-700 leading-7 text-lg">
              BloodCare is an automated blood service that connects blood
              searchers with voluntary donors in moments through Call. BloodCare
              is always a free service for everyone.
            </p>
          </div>

          {/* Right Section */}
          <div>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li>• 100% Automated</li>
              <li>• Always free</li>
              <li>• 24×7 service</li>
              <li>• All data is secured</li>
            </ul>
          </div>
        </div>

        {/* Button */}
        <div className="text-center mt-14">
          <Link
            href="/"
            className="px-8 py-3 bg-red-600 text-white rounded-lg text-lg
            shadow-lg hover:bg-red-700 transition-all duration-200 hover:shadow-red-300/60"
          >
            Learn More
          </Link>
        </div>
      </section>
      {/* What is BloodCare? end */}

      <section>
        <div className="bg-gray-50 py-16">
          <Testimonials />
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About Us
          </h2>

          <p className="text-gray-700 leading-7 text-lg mb-10">
            BloodCare is an automated blood service that connects blood
            searchers with voluntary blood donors within moments through Call.
            BloodCare is a nonprofit initiative dedicated to raising awareness
            and making voluntary blood donation easier across Bangladesh.
          </p>

          <button className="px-8 py-3 bg-red-600 text-white rounded-lg text-lg shadow-lg hover:bg-red-700 transition-all duration-200 hover:shadow-red-300/60">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}
