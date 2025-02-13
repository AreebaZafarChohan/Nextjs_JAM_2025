"use client";
import React, { useState } from "react";
import { PrevArrowsProps } from "../../../types/components";
import { GoArrowLeft } from "react-icons/go";
const PrevArrow = ({ onClick }: PrevArrowsProps) => {
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
      } h-[24px] w-[24px] absolute xxl:left-[1090px] xl:left-[1040px] top-[-50px] cursor-pointer mt-[2.6rem] transform -translate-y-1/2 transition-colors duration-300 lg:left-[750px] md:left-[700px] sm:left-[540px] xs:left-[470px] xxs:left-[370px] spc3:left-[230px] left-[70px]`}
    >
      <GoArrowLeft className="md:h-[24px] md:w-[24px] h-[20px] w-[20px] text-darkPrimary" />
    </div>
  );
};

export default PrevArrow;
