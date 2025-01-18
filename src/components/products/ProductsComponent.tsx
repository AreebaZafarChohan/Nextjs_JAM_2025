"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import ProductCard from "../reuseableComponents/ProductCard";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { CardProps } from "../../../types/components";

const ProductsComponent = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isProductTypeOpen, setIsProductTypeOpen] = useState(false);
  const [isDateAddedOpen, setIsDateAddedOpen] = useState(false);


  const toggleFilterMenu = () => setIsFilterOpen(!isFilterOpen);
  const toggleSortMenu = () => setIsSortOpen(!isSortOpen);
  const toggleCategoryMenu = () => setIsCategoryOpen(!isCategoryOpen);
  const togglePriceMenu = () => setIsPriceOpen(!isPriceOpen);
  const toggleProductTypeMenu = () => setIsProductTypeOpen(!isProductTypeOpen);
  const toggleBrandMenu = () => setIsBrandOpen(!isBrandOpen);
  const toggleDateAddedMenu = () => setIsDateAddedOpen(!isDateAddedOpen);
  

   const [productData, setProductData] = useState<CardProps[] | null>(null);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const products = await client.fetch(
            `*[_type=="product"]{
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
    <div className="relative  flex flex-col w-full lg:h-[2439px] md:h-[2439px] product-sec">
      {/* Product Image Section */}
      <div className="relative w-full lg:h-[2439px] h-[146px] ">
        <Image
          src="/images/productBg.png"
          alt="Product Background Image"
          width={200}
          height={200}
          className="w-full h-[146px] lg:h-[209px] object-cover"
        />
        <h1 className="font-clash font-normal leading-[50.4px] text-white text-3xl lg:text-[1.9rem] absolute top-[3.5rem] lg:top-[7.7rem] xl:left-[5rem] xl:text-[2.27rem] lg:left-[3.5rem] left-[6rem] md:text-[1.5rem] md:top-[5.1rem] md:left-[3.45rem]"> 
          All products
        </h1>
      </div>

      <div className="h-[96px] flex gap-4 justify-center my-[4rem] sm:hidden relative">
        {/* Filter Button */}
        <div className="relative">
          <button
            className="w-[143px] h-[56px] flex items-center justify-center px-4 py-2 shadow-sm bg-lightGray hover:bg-darkPrimary hover:text-white transition text-darkBlue"
            onClick={toggleFilterMenu}
          >
            <span className="font-satoshi font-normal leading-6">Filter</span>
            <IoMdArrowDropdown className="ml-2 " />
          </button>
          {isFilterOpen && (
            <div className="absolute top-12 left-0 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul className="text-darkBlue text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Price
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Category
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Rating
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Sorting Button */}
        <div className="relative">
          <button
            className="w-[143px] h-[56px] flex items-center justify-center px-4 py-2 shadow-sm bg-lightGray hover:bg-darkPrimary hover:text-white transition text-darkBlue"
            onClick={toggleSortMenu}
          >
            <span className="font-satoshi font-normal leading-6">Sorting</span>
            <IoMdArrowDropdown className="ml-2 " />
          </button>
          {isSortOpen && (
            <div className="absolute top-12 left-0 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul className="text-darkBlue text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Price: Low to High
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Price: High to Low
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Popularity
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Newest
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="hidden sm:flex lg:justify-between sm:justify-start sm:items-start lg:items-center lg:flex-row flex-col px-6 py-8">
        {/* Left Side Filters */}
        <div className="flex gap-4 ">
          {/* Category Filter */}
          <div className="relative lg:bottom-[90rem]">
            <button
              onClick={toggleCategoryMenu}
              className="flex items-center px-[24px] py-[12px] text-[#2a254b] hover:bg-gray-100 font-satoshi font-normal leading-6 text-lg"
            >
              Category
              <IoMdArrowDropdown className="ml-2 text-xl" />
            </button>
            {/* Dropdown Menu */}

            {isCategoryOpen && (
              <div className="absolute top-12 hidden bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul className="text-sm text-darkBlue">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Furniture
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Decor
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Lighting
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Product Type Filter */}
          <div className="relative lg:bottom-[90rem]">
            <button
              onClick={toggleProductTypeMenu}
              className="flex items-center px-[24px] py-[12px] text-[#2a254b] hover:bg-gray-100 font-satoshi font-normal leading-6 text-lg"
            >
              Product Type
              <IoMdArrowDropdown className="ml-2 text-xl" />
            </button>
            {isProductTypeOpen && (
              <div className="absolute top-12 left-0 hidden bg-white border border-gray-300 rounded-lg shadow-lg z-10 group-hover:block">
                <ul className="text-sm text-darkBlue">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Furniture
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Decor
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Lighting
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="relative lg:bottom-[90rem]">
            <button
              onClick={togglePriceMenu}
              className="flex items-center px-[24px] py-[12px] text-[#2a254b] hover:bg-gray-100 font-satoshi font-normal leading-6 text-lg"
            >
              Price
              <IoMdArrowDropdown className="ml-2 text-xl" />
            </button>

            {isPriceOpen && (
              <div className="absolute top-12 left-0 hidden bg-white border border-gray-300 rounded-lg shadow-lg z-10 group-hover:block">
                <ul className="text-sm text-darkBlue">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    &pond;125
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    &pond;399
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    &pond;155
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    &pond;250
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div className="relative lg:bottom-[90rem]">
            <button
              onClick={toggleBrandMenu}
              className="flex items-center px-[24px] py-[12px] text-[#2a254b] hover:bg-gray-100 font-satoshi font-normal leading-6 text-lg"
            >
              Brand
              <IoMdArrowDropdown className="ml-2 text-xl" />
            </button>
            {isBrandOpen && (
              <div className="absolute top-12 left-0 hidden bg-white border border-gray-300 rounded-lg shadow-lg z-10 group-hover:block">
                <ul className="text-sm text-darkBlue">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Interwood
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Habitt
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    ChenOne
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Dolce Vita Home
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Sorting */}
        <div className="relative flex gap-4 lg:bottom-[90rem] lg:ml-0 md:ml-6 right-side">
          <p className="leading-[21px] font-satoshi font-normal text-darkPrimary text-lg mt-3">
            Sorted by:
          </p>
          <button
            onClick={toggleDateAddedMenu}
            className="flex items-center px-[24px] py-[12px] text-[#2a254b] hover:bg-gray-100 font-satoshi font-normal leading-6 text-lg"
          >
            Date Added
            <IoMdArrowDropdown className="ml-2 text-xl" />
          </button>
          {/* Dropdown Menu */}
          {isDateAddedOpen && (
            <div className="absolute top-12 left-0 hidden bg-white border border-gray-300 rounded-lg shadow-lg z-10 group-hover:block">
              <ul className="text-sm text-darkBlue">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Newest
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Oldest
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Price: Low to High
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Price: High to Low
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="relative lg:bottom-[85rem] h-[625px] grid grid-cols-2 lg:grid-cols-4 gap-[2rem] md:gap-0 md:pr-32 lg:pr-0 md:gap-y-[6rem] gap-y-[8rem] lg:gap-y-[10rem] lg:gap-[2rem] mt-[20rem] lg:mx-4 md:mt-[25rem] lg:mt-0 md:mx-auto xl:ml-8 product-sec-card">
      {productData?.length ? (
    productData.map((product) => (
      <div key={product.id}>
        <ProductCard productData={product} 
        />
      </div>
    ))
  ) : (
    <p>Loading products...</p>
  )}
</div>

      <div className="px-[2rem] product-sec-btn">
        <button className="w-full md:relative mt-[12rem] lg:bottom-[5rem] md:-bottom-[21rem] md:left-[16rem] lg:left-[30rem] xl:left-[36rem] md:mt-0 md:w-[200px] md:h-[56px] py-[16px] px-[32px] bg-lightGray bg-opacity-[15%] leading-6 text-darkPrimary font-satoshi font-normal hover:bg-darkPrimary hover:text-white transition-all duration-300 ease-in-out border-2 border-darkPrimary">
          <Link href="/ ">View collection</Link>
        </button>
      </div>
    </div>
  );
};

export default ProductsComponent;
