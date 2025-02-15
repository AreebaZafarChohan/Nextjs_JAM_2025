"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../reuseableComponents/ProductCard";
import FeatureCard from "../reuseableComponents/FeatureCard";
import SignUp from "../heroSection/SignUp";
import { CardProps } from "../../../types/components";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

import { Autoplay } from "swiper/modules";
import ProductDetailsTab from "../designComponents/ProductDetailsTab";

const ProductCardDetails = () => {
  const params = useParams(); // Getting the route parameter
  const productId = params?.id;
  const [details, setDetails] = useState<CardProps | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Default quantity set to 1
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
  const [productData, setProductData] = useState<CardProps[] | null>(null);
  const router = useRouter();

  // Fetch product details from Sanity
  useEffect(() => {
    const fetchProductDetails = async () => {
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

        // Find the product based on productId
        const productDetails = products.find(
          (item: CardProps) => item?.id?.toString() === productId
        );

        setDetails(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1); // Prevent going below 1
  };

  // Handle Add to Cart functionality
  const handleAddToCart = () => {

    const stock = details?.stock ?? 0;
  
    if (stock <= 0) {
      alert("Product is out of stock!");
      return;
    }
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product already exists in the cart
    const existingProductIndex = existingCart.findIndex(
      (item: any) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      // Update the quantity of the existing product
      existingCart[existingProductIndex].quantity += quantity;
    } else {
      // Add the new product with the selected quantity
      existingCart.push({
        id: productId,
        heading: details?.name,
        price: details?.price,
        quantity,
        image: details?.imageUrl,
      });
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Show the modal for the product added to cart
    setIsModalOpen(true);

    // Close the modal after 3 seconds
    setTimeout(() => {
      setIsModalOpen(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await client.fetch(
          `*[_type=="product"][2..5]{
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
    <div className="relative w-full min-h-screen mx-auto lg:mx-0 md:mx-auto">
      {details && (
        <div className="w-full mt-[6rem] h-[1055px] bg-white flex flex-col md:mt-[8rem] md:flex-row md:gap-[1.5rem] md:h-[759px] details">
          <div className="md:w-[55%] md:h-[759px] xs:h-[600px] h-[380px]">
            <Image
              src={`${details.imageUrl}`}
              alt={`${details.name} Image`}
              width={200}
              height={200}
              className="w-full md:h-[759px] h-[380px] detail-img"
            />
          </div>
          <div className="lg:h-[657px] md:w-[45%] w-full lg:mx-[1.5rem] h-[675px] p-[1.5rem] detail-div">
            <div className="flex flex-col gap-[12px]">
              <h3 className="font-clash font-normal leading-[33.6px] text-darkPrimary text-[1.6rem] lg:text-4xl md:text-3xl">
                {details.name}
              </h3>
              <h4 className="font-clash font-normal leading-7 mt-1 md:mt-0 text-darkPrimary text-xl lg:text-3xl md:text-2xl">
                {" "}
                &#163; {details.price}
              </h4>
            </div>
            <div className="flex mt-4 md:mt-10 flex-col gap-[12px]">
              <h5 className="font-clash font-normal leading-[22.4px] text-darkPrimary text-lg md:text-xl lg:text-2xl">
                Product description
              </h5>
              <p className="font-satoshi font-normal text-darkPrimary leading-[21px] text-[16px] lg:text-lg md:text-base">
                {details.description}
              </p>
              <ul className="list-disc mt-1 mb-4 mx-2">
                <li className="font-satoshi marker:leading-[21px] text-darkPrimary font-normal lg:text-lg md:text-base">
                  Premium material
                </li>
                <li className="font-satoshi marker:leading-[21px] text-darkPrimary lg:text-lg md:text-base font-normal">
                  Handmade upholstery
                </li>
                <li className="font-satoshi marker:leading-[21px] md:text-base lg:text-lg text-darkPrimary font-normal">
                  Quality timeless classic
                </li>
              </ul>
            </div>
            <div className="dimensions">
              <h5 className="font-clash font-normal leading-[22.4px] text-darkPrimary text-lg md:text-xl lg:text-2xl mt-4">
                Dimensions
              </h5>
              <div className="mt-4 flex justify-between gap-6">
                <h6 className="font-normal font-clash leading-[19.6px] text-darkPrimary lg:text-lg md:text-base">
                  Height
                </h6>
                <h6 className="font-normal font-clash leading-[19.6px] text-darkPrimary md:text-lg">
                  Width
                </h6>
                <h6 className="font-normal font-clash leading-[19.6px] text-darkPrimary lg:text-lg md:text-base">
                  Length
                </h6>
              </div>
              <div className="flex justify-between mt-3">
                <h6 className="font-normal font-clash leading-[19.6px] text-darkPrimary lg:text-lg md:text-base">
                  {`${details.dimensions?.height}cm`}
                </h6>
                <h6 className="font-normal font-clash leading-[19.6px] text-darkPrimary lg:text-lg md:text-base">
                  {`${details.dimensions?.width}cm`}
                </h6>
                <h6 className="font-normal font-clash leading-[19.6px] text-darkPrimary lg:text-lg md:text-base">
                  {`${details.dimensions?.length}cm`}
                </h6>
              </div>
              <div className="border-t border-darkPrimary pt-2 my-2">
                {details?.stock !== undefined && details?.stock !== null ? (
                  details.stock === 0 ? (
                    <p className="font-normal text-red-500">Out of Stock</p>
                  ) : (
                    <p className="font-normal text-green-500">
                      ({details.stock} Available)
                    </p>
                  )
                ) : (
                  <p className="font-normal text-gray-500">
                    Stock information unavailable
                  </p>
                )}
              </div>
            </div>
            <div className=" flex flex-col gap-[12px] ">
              <h5 className="relative font-clash font-normal leading-[22.4px] text-darkPrimary text-lg md:text-xl lg:text-2xl md:top-10">
                Quantity
              </h5>
              <div className="relative lg:top-5 mt-4 lg:mt-4 md:mt-10 flex items-center lg:justify-center space-x-4 md:space-x-0 bg-lightGray md:w-32 w-full quantity-btn">
                <button
                  onClick={decrease}
                  className="bg-lightGray text-darkPrimary hover:bg-darkPrimary hover:text-white p-2 rounded w-full md:w-[50px] "
                >
                  <p className="text-xl md:pl-0 pl-[4rem] pb-3">_</p>
                </button>

                <div className="text-xl text-darkPrimary px-2">{quantity}</div>

                <button
                  onClick={increase}
                  className="bg-lightGray text-darkPrimary hover:bg-darkPrimary hover:text-white p-2 rounded w-full md:w-[50px]"
                >
                  <p className="text-xl md:pr-0 pr-[4rem] py-1.5">+</p>
                </button>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="relative md:top-5 md:w-[250px] w-full bg-darkPrimary px-[32px] py-[10px] font-satoshi font-normal leading-6 text-white hover:bg-navbarColor md:h-[3rem] add-to-cart"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => router.push("/products")}
                  className="relative md:top-5 md:w-[250px] w-full bg-lightGray px-[32px] py-[10px] font-satoshi font-normal leading-6 text-darkPrimary hover:bg-darkPrimary hover:text-white md:h-[3rem] see-less"
                >
                  See Less
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <h3 className="text-xl text-darkPrimary">Product added to cart!</h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-6 py-2 bg-darkPrimary text-white rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <h3 className="text-xl text-darkPrimary">
              {details?.name} added to cart!
            </h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-6 py-2 bg-darkPrimary text-white rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="mt-[8rem]">
          <ProductDetailsTab />
        </div>

      <div className="w-full md:mt-[2rem] h-[811px] flex flex-col md:mx-8 lg:mx-0 xl:mx-7 detail-products">
        <h5 className="mt-[10rem] lg:mt-[10rem] md:mt-[15rem] leading-[24.6px] text-darkPrimary font-clash font-normal text-xl md:text-2xl lg:text-3xl">
          You might also like
        </h5>
        <div className="detail-product-card md:block lg:block xl:block sm:block hidden">
          {productData?.length ? (
            <Swiper
              spaceBetween={16} // Spacing between slides
              slidesPerView={3} // Default slides for small screens
              modules={[Autoplay]} // Include Autoplay in modules
              autoplay={{
                delay: 1000, // Delay between slides in milliseconds
                disableOnInteraction: false, // Allow autoplay even after interaction
              }}
              loop={true} // Enable looping
            >
              {productData.map((product) => (
                <SwiperSlide key={product.id}>
                  {/* Render ProductCard for each product */}
                  <ProductCard productData={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-3xl text-darkPrimary font-bold font-clash">
              Loading products...
            </p>
          )}
        </div>

        <div className="detail-product-card md:hidden lg:hidden xl:hidden sm:hidden block">
          {productData?.length ? (
            <Swiper
              spaceBetween={16} // Spacing between slides
              slidesPerView={2} // Default slides for small screens
              modules={[Autoplay]} // Include Autoplay in modules
              autoplay={{
                delay: 1000, // Delay between slides in milliseconds
                disableOnInteraction: false, // Allow autoplay even after interaction
              }}
              loop={true} // Enable looping
            >
              {productData.map((product) => (
                <SwiperSlide key={product.id}>
                  {/* Render ProductCard for each product */}
                  <ProductCard productData={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-3xl text-darkPrimary font-bold font-clash">
              Loading products...
            </p>
          )}
        </div>

        <button className="md:w-[250px] w-full md:relative lg:left-[34rem] lg:-bottom-[2rem] md:-bottom-[18rem] md:left-[16rem] py-[16px] px-[32px] bg-lightGray bg-opacity-[15%] leading-6 text-darkPrimary font-satoshi font-normal hover:bg-darkPrimary hover:text-white transition-all duration-300 ease-in-out mt-[2rem]">
          View collection
        </button>
      </div>

      <div className="relative w-full lg:top-[4rem] md:top-[22rem] lg:mt-0 h-[757px] detail-feature">
        <div className="relative lg:h-[335px] w-full h-[757px] bg-white flex flex-col gap-[2rem] md:gap-0 lg:gap-[2rem] lg:justify-center lg:mx-auto lg:items-center mx-auto sm:mx-6 ">
          <h4 className="font-clash text-2xl font-normal leading-[28px] lg:text-3xl pb-4 lg:p-0 px-8 feature-heading">
            What makes our brand different
          </h4>

          <div
            className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 md:pr-[3rem] lg:pr-0 lg:gap-8 hero-features"
            id="detail-features"
          >
            <FeatureCard
              image="Delivery"
              heading="Next day as standard"
              para="Order before 3pm and get your order the next day as standard"
            />

            <FeatureCard
              image="Checkmark"
              heading="Made by true artisans"
              para="Handmade crafted goods made with real passion and craftmanship"
            />

            <FeatureCard
              image="Purchase"
              heading="Unbeatable prices"
              para="For our materials and quality you won't find better prices anywhere"
            />

            <FeatureCard
              image="Sprout"
              heading="Recycled packaging"
              para="We use 100% recycled packaging to ensure our footprint is manageable"
            />
          </div>
        </div>
      </div>
      <div className="relative lg:bottom-[33rem] md:-bottom-[4rem]  mt-[12rem] lg:mt-[2rem] w-full h-[292px] detail-signup">
        <div>
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default ProductCardDetails;
