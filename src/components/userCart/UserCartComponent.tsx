"use client";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Link from "next/link";
import CheckoutModal from "../OrderSystem/CheckoutModal";

const UserCartComponent = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch items from localStorage
    const items = JSON.parse(localStorage.getItem("cart") || "[]");

    // Add logic to update quantity if the item already exists
    const updatedItems = items.map((item: any) => ({
      ...item,
      quantity: 1, // Default quantity to 1 if not provided
    }));

    setCartItems(updatedItems);
  }, []);

  const updateLocalStorage = (updatedCart: any[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter((item) => item.quantity > 0); // Remove items with quantity 0
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleAddItem = (newItem: any) => {
    const itemIndex = cartItems.findIndex(
      (item) => item.id === newItem.id || item.name === newItem.name
    );
  
    if (itemIndex > -1) {
      // If item exists, update quantity
      const updatedCart = [...cartItems];
      updatedCart[itemIndex].quantity += 1;
      setCartItems(updatedCart);
      updateLocalStorage(updatedCart);
    } else {
      // Otherwise, add a new item
      const updatedCart = [...cartItems, { ...newItem, imageUrl: newItem.imageUrl }];
      setCartItems(updatedCart);
      updateLocalStorage(updatedCart);
    }
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  //Handle Modal 
  const handleOpenModal = () => {
  if (cartItems.length === 0 || calculateSubtotal() === 0) {
    alert("Please add items to your cart before proceeding to checkout.");
    return;
  }
  setIsModalOpen(true);
};
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSubmitForm = (formData: any) => {
    console.log(formData); // Handle form submission (e.g., send to backend or update UI)
    handleCloseModal();
  };

  return (
    <div className="relative bg-lightGray h-full mx-auto w-full lg:px-0 py-4 px-6 user-cart">
      <CheckoutModal isOpen={isModalOpen} closeModal={handleCloseModal} onSubmit={handleSubmitForm} />

      <h3 className="mx-10 font-clash font-normal leading-[33.6px] text-darkPrimary my-2 text-2xl md:text-4xl">
        Your shopping cart
      </h3>

      <div className="hidden lg:block md:m-[2rem]">
        <div className="flex relative">
          <p className="pl-[1rem] text-lg font-clash font-normal leading-[19.6px] text-darkPrimary">Product</p>
          <p className="pl-[23.5rem] font-clash font-normal text-lg leading-[19.6px] text-darkPrimary">Total</p>
        </div>
        <hr className="bg-lightGray"/>
      </div>

      <div className="mx-4 flex justify-between mt-8 gap-4">
        {/* Left side: Products List */}
        <div className="w-2/3">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ItemCard
                key={item.id}
                image={item.imageUrl || ""}
                name={item.name}
                price={Number(item.price)}
                quantity={item.quantity}
                onIncrease={() => handleQuantityChange(item.id, 1)}
                onDecrease={() => handleQuantityChange(item.id, -1)}
                onRemove={() => handleRemoveItem(item.id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">Your cart is empty.</p>
          )}
        </div>

        {/* Right side: Subtotal & Summary */}
        <div className="w-1/3 p-4 bg-white rounded-lg shadow-md mx-4">
          <h4 className="font-clash text-darkPrimary text-xl mb-4">Summary</h4>
          <div className="space-y-4">
            {/* List products and their prices */}
            {cartItems.map((item) => (
              <div className="flex justify-between" key={item.id}>
                <p className="font-satoshi text-lg text-darkPrimary">
                  {item.quantity} x {item.heading}
                </p>
                <p className="font-satoshi text-lg text-darkPrimary">
                  £{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Total and other details */}
          <div className="flex justify-between mt-6">
            <p className="font-satoshi text-lg text-darkPrimary">Subtotal</p>
            <p className="font-satoshi text-lg text-darkPrimary">£{calculateSubtotal().toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-satoshi text-lg text-darkPrimary">Taxes & Shipping</p>
            <p className="font-satoshi text-lg text-darkPrimary">Calculated at checkout</p>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button onClick={handleOpenModal} className="px-6 py-2 bg-darkPrimary text-white rounded-md hover:bg-navbarColor">
              Go to checkout
            </button>
            <button className="px-6 py-2 bg-darkPrimary text-white rounded-md hover:bg-navbarColor">
              <Link href="/products">Continue Shopping</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCartComponent;
