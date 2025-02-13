"use client";
import React, { useState } from "react";
import { NextArrowsProps } from "../../../types/components";
import { GoArrowRight } from "react-icons/go";
const NextArrow = ({ onClick }: NextArrowsProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      onClick={() => {
        onClick?.(); 
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={`md:w-[46px] md:h-[46px] w-[38px] h-[38px] rounded-full ${
        isActive ? "bg-btnBackground" : "card-bg"
      } h-[24px] w-[24px] absolute xxl:left-[1120px] xl:left-[1070px] top-[-50px] mt-[2.6rem] cursor-pointer transform -translate-y-1/2 transition-colors duration-300 lg:left-[780px] md:left-[730px] sm:left-[580px] xs:left-[500px] xxs:left-[400px] spc3:left-[260px] left-[100px]`}
    >
      <GoArrowRight className="md:h-[24px] md:w-[24px] h-[20px] w-[20px] text-darkPrimary" />
    </div>
  );
};

export default NextArrow;
