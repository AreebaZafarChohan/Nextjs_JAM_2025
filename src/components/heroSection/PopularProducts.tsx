"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import ProductCard from "../reuseableComponents/ProductCard";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { CardProps } from "../../../types/components";
import Link from "next/link";

const PopularProducts = () => {
  const [productData, setProductData] = useState<CardProps[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await client.fetch(
          `*[_type=="product"][0..3]{
            id, name, description, price, color, material,
            dimensions, "stock": stock->stock, added_on,
            "imageUrl": image.asset->url, rating, rating_counts, 
            category, comments
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
    <div className="relative mt-28 bg-white px-4 md:px-8 lg:px-16 text-center">
      <h4 className="text-xl md:text-2xl lg:text-4xl font-clash text-darkPrimary mb-6">
        Our Popular Products
      </h4>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
      >
        {productData?.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard productData={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-8">
        <Link href="/products" className="px-6 py-3 border border-darkPrimary text-darkPrimary hover:bg-darkPrimary hover:text-white transition">
          View Collection
        </Link>
      </div>
    </div>
  );
};

export default PopularProducts;