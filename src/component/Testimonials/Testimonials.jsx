"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

export default function Testimonials() {
  const reviews = [
    {
      name: "Rahim",
      text: "I received blood here and it saved my cousin's life. I felt extremely happy and the staff were amazing!",
      image: "https://i.ibb.co.com/rRbqv7n2/Rahim.jpg",
      rating: 5,
    },
    {
      name: "Karim",
      text: "Thanks to this organization, my grandfather got the blood he urgently needed. So grateful for the caring staff!",
      image: "https://i.ibb.co.com/S4K8K5WK/Karim.jpg",
      rating: 5,
    },
    {
      name: "Sumi",
      text: "My brother received blood from here. I am beyond relieved and thankful for this life-saving support!",
      image: "https://i.ibb.co.com/gFSDbJSk/Sumi.jpg",
      rating: 5,
    },
    {
      name: "Anika",
      text: "Receiving blood here brought me so much relief. The staff were friendly and very supportive!",
      image: "https://i.ibb.co.com/LX0Qc6SD/Anika.jpg",
      rating: 5,
    },
    {
      name: "Rafi",
      text: "I got the blood I needed in an emergency. The experience was smooth, and I feel so happy and thankful!",
      image: "https://i.ibb.co.com/WNVFNT2x/Rafi.jpg",
      rating: 5,
    },
    {
      name: "Tania",
      text: "This organization helped save my loved one's life with timely blood. Extremely satisfied and grateful!",
      image: "https://i.ibb.co.com/FLYYjvWK/Tania.jpg",
      rating: 5,
    },
    {
      name: "Imran",
      text: "I never expected to receive such quick help. The blood donation process was amazing and life-saving!",
      image: "https://i.ibb.co.com/d44bNvPS/Imran.jpg",
      rating: 5,
    },
  ];

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-yellow-400 ${i < count ? "" : "opacity-30"}`}
      >
        ★{" "}
      </span>
    ));
  };

  return (
    <div className="w-full bg-gray-50">
      {" "}
      <h2 className="text-3xl font-bold text-center mb-8">
        Blood Donor Reviews
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        freeMode={true}
        modules={[FreeMode, Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          300: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1280: { slidesPerView: 3, spaceBetween: 35 },
        }}
        className="mySwiper"
      >
        {reviews.map((review, index) => (
          <SwiperSlide
            key={index}
            className="bg-white p-6 m-4 h-14 w-11/12 rounded-xl border hover:shadow-2xl transition-shadow duration-300"
          >
            {" "}
            <div className="flex flex-col items-center text-center py-6">
              {" "}
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full mb-4 border-2 border-red-500"
              />{" "}
              <h3 className="text-lg font-semibold">{review.name}</h3>{" "}
              <div className="flex justify-center mt-2">
                {renderStars(review.rating)}
              </div>{" "}
              <p className="text-gray-600 mt-4">{review.text}</p>{" "}
            </div>{" "}
          </SwiperSlide>
        ))}{" "}
      </Swiper>{" "}
    </div>
  );
}
