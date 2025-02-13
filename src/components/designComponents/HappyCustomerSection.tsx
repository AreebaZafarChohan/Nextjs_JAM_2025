import React from "react";
import HappyCustomerCardList from "./HappyCustomerCardList";

const HappyCustomerSection = () => {
  return (
    <section className="w-full flex flex-col text-center px-4 md:px-4 lg:px-4 xl:px-4 mt-28 lg:mt-72">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-darkPrimary leading-tight tracking-wide font-clash mb-8">
        OUR HAPPY CUSTOMERS
      </h1>
      <div className="w-full">
        <HappyCustomerCardList />
      </div>
    </section>
  );
};

export default HappyCustomerSection;
