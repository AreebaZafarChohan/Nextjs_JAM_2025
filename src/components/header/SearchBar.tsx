"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { ScrollArea } from "@radix-ui/react-scroll-area"; 
import Image from "next/image";
import { CardProps } from "../../../types/components";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [productData, setProductData] = useState<CardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<CardProps[]>([]);
  const route = useRouter();

 // Fetch products from Sanity
 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const products: CardProps[] = await client.fetch(
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
        "image": image.asset->url,
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

// Filter products based on search query
useEffect(() => {
  if (searchQuery.trim() === "") {
    setFilteredProducts([]);
  } else {
    const results = productData.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }
}, [searchQuery, productData]);

 
  return (
    <div className=" w-[260px] sm:w-[340px] md:w-[400px] xl:w-[377px] xl:h-[48px] lg:h-[45px] md:h-[30px] py-[6px] md:py-[12px] px-[16px] rounded-[62px] bg-bgLightGrayColor flex gap-[12px] items-center font-satoshi relative border shadow-md">
      <CiSearch />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full md:text-[12px] lg:text-[16px] font-normal text-black/40 border-none outline-none bg-bgLightGrayColor font-satoshi"
        placeholder="Search for products..."
      />
      {filteredProducts.length > 0 && (
        <div className="absolute left-0 top-[calc(100%+4px)] w-full lg:w-[calc(100vw-70vw)] bg-white shadow-lg rounded-md z-50 max-h-60 border overflow-auto">
          <ScrollArea>
            <ul className="p-2">
              {filteredProducts.map((product: CardProps) => (
                <li
                  key={product.id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => { {
                    route.push(`/products/${product.id}`)
                   }}}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    height={40}
                    width={40}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>{product.name}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default SearchBar;