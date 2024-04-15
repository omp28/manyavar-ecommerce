import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import main2 from "../public/images/main2.png";
import main1 from "../public/images/main.png";
import main3 from "../public/images/main3.png";
import main4 from "../public/images/main4.png";
// import { Pagination } from "swiper/modules";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function App() {
  const pagination = {
    clickable: true,
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image className=" w-full" src={main1} alt="main" />
        </SwiperSlide>
        <SwiperSlide>
          <Image className=" w-full" src={main2} alt="main" />
        </SwiperSlide>
        <SwiperSlide>
          <Image className=" w-full" src={main3} alt="main" />
        </SwiperSlide>
        <SwiperSlide>
          <Image className=" w-full " src={main4} alt="main" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
