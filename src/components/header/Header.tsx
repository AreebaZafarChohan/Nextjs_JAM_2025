"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import SearchBar from "./SearchBar";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  material: string;
  dimensions: string;
  stock: number;
  added_on: string;
  imageUrl: string;
  rating: number;
  rating_counts: number;
  category: string;
  comments: string[];
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);


  return (
    <nav className="relative w-full p-6 md:py-5 bg-white">
      <div className="flex justify-between md:justify-center items-center md:border-b md:border-lightGray">
        {/* Logo */}
        <h1 className="text-2 font-normal font-clash leading-[29.52px] text-darkBlue">
          Avion
        </h1>

        <div className="flex items-center space-x-4">
          {/* Hamburger Icon */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full text-darkPrimary hover:bg-gray-200"
          >
            ☰
          </button>
        </div>
      </div>
      <div className="flex justify-center my-4">
         {/* Search Icon */}
      <SearchBar />
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:flex md:grid md:grid-cols-5 flex-col lg:flex-row md:items-center md:justify-center mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-1 lg:space-x-8 lg:ml-16 md:ml-4 `}
      >
        <Link
          href="/"
          className="block text-center border-b border-transparent py-1 md:mt-3 lg:-mt-1 mt-0 hover:border-darkPrimary"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="block text-center border-b border-transparent py-1 hover:border-darkPrimary"
        >
          Products
        </Link>
        <Link
          href="/about"
          className="block text-center border-b border-transparent py-1 hover:border-darkPrimary"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="block text-center border-b border-transparent py-1 hover:border-darkPrimary"
        >
          Contact
        </Link>
        <Link
          href="/helpCenter"
          className="block text-center border-b border-transparent py-1 hover:border-darkPrimary"
        >
          Help Center
        </Link>

        <div className="relative flex gap-4 justify-center">
          {/* User Icon */}
          <Link href="/userOrder" aria-label="User Profile">
            <div className="stick right-[18rem] flex items-center justify-center w-6 h-6 rounded-full border border-transparent hover:bg-lightGray">
              <FaUserCircle />
            </div>
          </Link>

          {/* Cart Icon */}
          <Link href="/usercart" aria-label="Cart">
            <div className="stick  right-[16rem] flex items-center justify-center w-6 h-6 rounded-full border border-transparent hover:bg-lightGray">
              <FaShoppingCart />
            </div>
          </Link>

          { /* User Account by Clerk */}
          <div className="stick  right-[16rem] flex items-center justify-center w-6 h-6 rounded-full border border-transparent hover:bg-lightGray">
              <UserButton />
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
