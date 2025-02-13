"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "./NextArrow"; 
import PrevArrow from "./PrevArrow"; 
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";
import { CustomerCommnetsProps } from "../../../types/components";
const HappyCustomerCardList = () => {
  const [customerComments, setCustomerComments] = useState<
    CustomerCommnetsProps[]
  >([]);
  const query = `*[_type == "customerReviews"] {
    name,
    comment,
    _id,
    date
  }`;
  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(query);
      setCustomerComments(data);
    };
    fetchData();
  }, [query]);

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 3 } },
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1067, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 599, settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <div className="w-full xl:px-14 xxl:px-20 lg:px-20 ">
      <Slider {...settings}>
        {customerComments.map((comment) => (
          <div
            key={comment.name}
            className="md:w-[200px] md:h-[220px] w-[358px] h-[176px] rounded-[20px] border-[1px] border-darkPrimary p-[24px] "
          >
            <div className="flex flex-col justify-center gap-[10px]">
              <Image
                src="/images/rating-star.svg"
                alt=""
                height={30}
                width={20}
                className="h-[22.58px] w-[138.84px] "
              />
              <div className="flex justify-start gap-[20px]">
                <h1 className="font-clash md:text-[20px] text-[16px] font-bold text-darkPrimary ">
                  {comment.name}
                </h1>
                <Image
                  src="/images/correct-icon.svg"
                  alt="correct-icon"
                  height={24}
                  width={24}
                  className="h-[19px] w-[19px] mt-[2px]"
                />
              </div>
            </div>
            <p className="text-[12px] md:text-[14px] text-left text-darkPrimary lg:w-[270px] w-[270px] font-satoshi mt-2">
              {comment.comment}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HappyCustomerCardList;
