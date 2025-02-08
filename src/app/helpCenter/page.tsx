import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { AiOutlineFileSearch } from "react-icons/ai";
import { GoQuestion } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import Link from "next/link";
const HelpCenter = () => {
  return (
    <>
      <section className="flex justify-center items-center w-full mx-auto h-auto mt-16 lg:mt-24 md:mt-24 mb-14">
        <div className="flex flex-col justify-center items-center gap-y-[10px]">
          <div className="flex justify-center items-center gap-x-[10px] h-[30px] bg-bgLightGrayColor w-[200px] md:w-[250px] rounded-[50px]">
            <div className=" text-darkPrimary font-satoshi text-[12px] md:text-[14px] ">
              All Services Customer
            </div>
            <FaArrowRight className="sm:h-4 sm:w-4 text-darkPrimary mt-1" />
          </div>
          <h1 className="uppercase font-clash text-[28px] md:text-[42px] text-darkPrimary font-extrabold tracking-wider text-center ">
            Help Center
          </h1>
          <p className="text-center font-satoshi text-[12px] md:text-[14px] md:px-20 font-normal px-7 lg:px-[200px] xl:px-[300px] text-black/50 xxl:text-[16px]">
            Running into a problem? Our help center is here to help you find
            quick and easy solutions. Explore our FAQs, guides, and contact us
            for personalized support.
          </p>
          <div className="flex justify-center items-center gap-x-[10px] mt-3">
            <button className="bg-darkPrimary text-white w-[120px] h-[30px] rounded-[50px] font-satoshi text-[14px] font-medium flex justify-center items-center transition-all duration-300 hover:bg-white hover:border-[1px] hover:border-darkPrimary hover:text-darkPrimary">
              Chatbot
            </button>
            <button className="bg-yellow-500/55 text-darkPrimary w-[120px] h-[30px] rounded-[50px] font-satoshi text-[14px] font-medium flex justify-center items-center transition-all duration-300 hover:bg-darkPrimary border-[1px] border-darkPrimary hover:text-white">
              Request Send
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-0 px-5 sm:px-0 md:px-16 lg:px-20 xl:px-11 xxl:px-3 mt-6">
            <div className="w-[250px] h-[250px] border-t-[1px] border-full border-green-500 ">
              <div className="flex flex-col gap-y-[10px] justify-start py-3 hover:bg-gray-50 transition-all duration-300 cursor-pointer ease-linear">
                <AiOutlineFileSearch className="h-[30px] w-[30px] text-black/50" />
                <h1 className="text-darkBlue font-clash text-[20px] font-semibold">
                  User Guide
                </h1>
                <p className="text-left font-normal text-darkBlue font-satoshi text-[14px]">
                  Easily navigate our platform with our comprehensive user
                  guide. Find step-by-step instructions, helpful tips, and
                  answers to common questions.
                </p>
                <Link
                  href="/user-guide"
                  className="flex justify-between items-center w-full mx-auto "
                >
                  <button className="text-darkBlue font-satoshi hover:text-black/80 text-[14px] ">
                    Read More
                  </button>
                  <FaArrowRight className="text-darkPrimary h-[15px] w-[15px]" />
                </Link>
              </div>
            </div>
            <div className="w-[250px] h-[250px] border-t-[1px] border-full border-yellow-500">
              <div className="flex flex-col gap-y-[10px] justify-start py-3 hover:bg-gray-50 transition-all duration-300 cursor-pointer ease-linear">
                <GoQuestion className="h-[30px] w-[30px] text-black/50" />
                <h1 className="text-darkBlue font-clash text-[20px] font-semibold">
                  FAQs
                </h1>
                <p className="text-left font-normal text-darkBlue font-satoshi text-[14px]">
                  Find answers to frequently asked questions about our products,
                  services, and more.
                </p>
                <Link
                  href="/faq"
                  className="flex justify-between items-center w-full mx-auto "
                >
                  <button className="text-darkBlue font-satoshi hover:text-black/80 text-[14px] ">
                    Read More
                  </button>
                  <FaArrowRight className="text-black h-[15px] w-[15px]" />
                </Link>
              </div>
            </div>
            <div className="w-[250px] h-[250px] border-t-[1px] border-full border-red-500">
              <div className="flex flex-col gap-y-[10px] justify-start py-3 hover:bg-gray-50 transition-all duration-300 cursor-pointer ease-linear">
                <MdOutlineEmail className="h-[30px] w-[30px] text-black/50" />
                <h1 className="text-darkBlue font-clash text-[20px] font-semibold">
                  Contact Us
                </h1>
                <p className="text-left font-normal text-darkBlue font-satoshi text-[14px]">
                  Get quick answers to common questions about our products,
                  services, and more.
                </p>
                <Link
                  href="/contact"
                  className="flex justify-between items-center w-full mx-auto "
                >
                  <button className="text-darkBlue font-satoshi hover:text-black/80 text-[14px] ">
                    Read More
                  </button>
                  <FaArrowRight className="text-black h-[15px] w-[15px]" />
                </Link>
              </div>
            </div>
            <div className="w-[250px] h-[250px]  border-t-[1px] border-full border-purple-500">
              <div className="flex flex-col gap-y-[10px] justify-start py-3 hover:bg-gray-50 transition-all duration-300 cursor-pointer ease-linear">
                <MdOutlineMessage className="h-[30px] w-[30px] text-black/50" />
                <h1 className="text-darkBlue font-clash text-[20px] font-semibold">
                  Live Chat
                </h1>
                <p className="text-left font-normal text-darkBlue font-satoshi text-[14px]">
                  Get instant answers to your questions with our live chat
                  support. Connect with a customer service representative in
                  real-time for quick assistance.
                </p>
                <Link
                  href="#"
                  className="flex justify-between items-center w-full mx-auto "
                >
                  <button className="text-darkBlue font-satoshi hover:text-black/80 text-[14px] ">
                    Read More
                  </button>
                  <FaArrowRight className="text-black h-[15px] w-[15px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HelpCenter;
