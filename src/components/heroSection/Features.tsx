import FeatureCard from "../reuseableComponents/FeatureCard";

const Features = () => {
  return (
    <div className="relative w-full bg-white flex flex-col items-center text-center gap-8 py-16 px-4 sm:px-6 md:px-12 lg:px-24">
      <h4 className="font-clash text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
        What makes our brand different
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
        <FeatureCard image="Delivery" heading="Next day as standard" para="Order before 3pm and get your order the next day as standard" />
        <FeatureCard image="Checkmark" heading="Made by true artisans" para="Handmade crafted goods made with real passion and craftsmanship" />
        <FeatureCard image="Purchase" heading="Unbeatable prices" para="For our materials and quality you won't find better prices anywhere" />
        <FeatureCard image="Sprout" heading="Recycled packaging" para="We use 100% recycled packaging to ensure our footprint is manageable" />
      </div>
    </div>
  );
};

export default Features;
