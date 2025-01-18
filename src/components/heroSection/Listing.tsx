"use client";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import ProductCard from "../reuseableComponents/ProductCard";
import { CardProps } from "../../../types/components";
import Link from "next/link";

const Listing = () => {
  const [productData, setProductData] = useState<CardProps[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await client.fetch(
          `*[_type=="product"][0..3]{
            id,
            name,
            description,
            price, 
            color, 
            material,
            dimensions, 
            "stock": stock->stock, 
            added_on,
           "imageUrl": image.asset->url,
            rating,
            rating_counts, 
            category,
            comments,
          }`
        );
        setProductData(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="relative h-[811px] mx-auto lg:mx-2 lg:h-[761px] bg-white flex flex-col gap-3 py-[3rem] mt-[17rem] lg:mt-0 md:bottom-[25rem] lg:-bottom-36 md:py-0 md:px-4 xl:mx-8 px-0 hero-listing">
      <h4 className="font-clash font-normal leading-[24.6px] text-darkPrimary text-xl lg:text-4xl xs:text-3xl lg:mb-6 hero-listing-h4">
        New ceramics
      </h4>
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-[4.8rem] lg:gap-[1.5rem] xs:gap-y-[8rem] md:gap-0 md:gap-x-4 hero-prodcuts">
      {productData?.length ? (
    productData.map((product) => (
      <div key={product.id}>
        <ProductCard productData={product} />
      </div>
    ))
  ) : (
    <p>Loading products...</p>
  )}
      </div>

      <button className="relative md:top-[4rem] lg:left-[28rem] md:left-[10rem] m-2 w-[309px] py-[16px] px-[32px] bg-lightGray bg-opacity-[15%] leading-6 text-[#2a254b] font-satoshi font-normal hover:bg-darkPrimary hover:text-white transition-all duration-300 ease-in-out text-lg h-14 border-2 border-[#2a254b] hero-button">
       <Link href="/products"> View collection</Link>
      </button>
    </div>
  );
};

export default Listing;
