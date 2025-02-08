import HappyCustomerSection from "@/components/designComponents/HappyCustomerSection";
import Features from "../components/heroSection/Features";
import GetInTouch from "../components/heroSection/GetInTouch";
import Hero from "../components/heroSection/Hero";
import Listing from "../components/heroSection/Listing";
import PopularProducts from "../components/heroSection/PopularProducts";
import SignUp from "../components/heroSection/SignUp";


export default function Home() {
  return (
    <div className="relative mx-auto w-full max-h-[5000px] md:max-h-[4400px] sm:max-h-[4300px] lg:max-h-[5000px] overflow-hidden hero-page">
      <Hero />
      <Features />
      <Listing />
      <PopularProducts />
      <SignUp />
      <HappyCustomerSection/>
      <GetInTouch />
    </div>
  );
}
