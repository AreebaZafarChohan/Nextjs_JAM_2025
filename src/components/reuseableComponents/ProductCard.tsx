"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CardProps } from "../../../types/components";
import { client } from "@/sanity/lib/client";

const ProductCard: React.FC<{ productData: CardProps }> = ({ productData }) => {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState();

  if (!productData) {
    return null; // Safeguard in case productData is undefined
  }

  // Function to update stock in Sanity
  const updateStock = async (productId: string, decrementBy: number) => {
    try {
      const updatedProduct = await client
        .patch(productId) // Specify the product to update
        .dec({ stock: decrementBy }) // Decrement stock by the specified quantity
        .commit(); // Commit the changes

      console.log('Stock updated:', updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleAddToCart = async () => {
    const productId = productData.id ?? "default-id"; // Provide a fallback ID if undefined
  
    const stock = productData.stock ?? 0;
  
    if (stock <= 0) {
      alert("Product is out of stock!");
      return;
    }
  
    const newItem = {
      id: productId,
      image: productData.imageUrl,
      name: productData.name,
      price: productData.price,
    };
  
    addItemToCart(newItem);
  
    // Update stock in Sanity
    const updatedProduct = await updateStock(productId, 1);
  
    if (updatedProduct) {
      productData.stock = updatedProduct.stock; // Update the local state (if applicable)
    }
  };

  const addItemToCart = (newItem: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product already exists in the cart
    const existingItem = cart.find((item: any) => item.id === newItem.id);

    if (existingItem) {
      // If it exists, update the quantity
      existingItem.quantity += 1;
    } else {
      // If not, add the new item
      cart.push({ ...newItem, quantity: 1 });
    }

    // Update the cart in the state and localStorage
    setCartItems(cart);
    localStorage.setItem("cart", JSON.stringify(cart));

    setPopupMessage(`${productData.name} has been added to your cart! ✅✨`);
    setTimeout(() => setPopupMessage(null), 2000);
  };

  return (
    <div
      key={productData.id}
      className="relative flex flex-col gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow "
      style={{ minHeight: "350px" }} // Ensure cards have a consistent minimum height
    >
      {/* Product Image */}
      <Image
        src={productData.imageUrl || "/placeholder-image.png"}
        alt={productData.name || "Product Image"}
        width={200}
        height={200}
        className="w-full lg:h-[300px] md:h-[200px] h-[200px] object-cover rounded-md"
      />

      {/* Product Details */}
      <div className="flex flex-col flex-grow justify-between">
        {/* Product Name and Price */}
        <div>
          <h4 className="font-clash font-normal leading-6 text-darkPrimary text-lg truncate">
            {productData.name || "No Name"}
          </h4>
          <p className="font-satoshi font-normal leading-6 text-darkPrimary text-base">
            &#163;{productData.price || 0}
          </p>
        </div>

        {/* Rating and Stock */}
        <div className="flex lg:justify-between items-center mt-2 lg;gap-0 gap-6">
          <h4 className="w-1/2 font-satoshi font-semibold text-xs sm:text-sm bg-yellow-500 px-2 py-1 rounded ">
            {`Rating - ${productData.rating}`}
          </h4>
          <p className="w-1/2 font-clash font-bold text-xs text-green-500">
            {`In Stock (${productData.stock || "Out of stock"})`}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex lg:justify-between lg:items-center mt-4 gap-2 lg:flex-row flex-col">
          <button
            onClick={handleAddToCart}
            className="lg:w-[120px] rounded px-4 py-2 bg-black/70 text-white hover:bg-gray-900"
          >
            Add to Cart
          </button>
          <Link
            href={`/products/${productData.id}`}
            className="lg:w-[120px] rounded px-4 py-2 bg-gray-200 text-center text-black hover:bg-gray-400"
          >
            See Details
          </Link>
        </div>
      </div>

      {/* Popup Message */}
      {popupMessage && (
        <div className="absolute top-12 right-4 bg-gray-900/60 text-white px-4 py-2 rounded-md shadow-md">
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default ProductCard;