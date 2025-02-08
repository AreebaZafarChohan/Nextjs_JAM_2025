import React from "react";
import HappyCustomerCardList from "./HappyCustomerCardList";
const HappyCustomerSection = () => {
  return (
    <>
      <section>
        <h1 className="absolute lg:top-[3450px] xl:top-[3450px] md:top-[3400px] sm:top-[3150px] md:left-[50px] xxl:left-[100px] xl:left-[50px] left-[16px] xs:mt-6 text-[32px] xl:text-[48px] font-extrabold text-darkPrimary leading-[36px] tracking-wider font-clash lg:left-[100px] lg:text-[40px] xxs:pt-[6rem] pt-0 spc:top-[2850px] spc2:mt-[40rem] spc3:mt-0 spc3:pt-0 spc3:top-[3250px] spc4:mt-[33rem]">
          OUR HAPPY CUSTOMERS
        </h1>
        <div className="relative lg:top-80 md:top-0 sm:top-36 xs:top-44 top-[-14rem] spc4:top-[9rem] mx-2">
          <HappyCustomerCardList />
        </div>
      </section>
    </>
  );
};

export default HappyCustomerSection;
