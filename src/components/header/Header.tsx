"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  return (
    <nav className="relative w-full p-6 md:py-5 bg-white">
      <div className="flex justify-between md:justify-center items-center md:border-b md:border-lightGray">
        {/* Logo */}
        <h1 className="text-2 font-normal font-clash leading-[29.52px] text-darkBlue">
          Avion
        </h1>

        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button
            onClick={toggleSearch}
            aria-label="Search"
            className="md:relative md:right-[20rem] lg:right-[33rem] flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200"
          >
            <CiSearch className="text-lg" />
          </button>

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

      {/* Search Box */}
      {isSearchOpen && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full border placeholder:text-white  bg-black/40 text-white border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      )}

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
          href="/"
          className="block text-center text-darkPrimary border-b border-transparent py-1 hover:border-darkPrimary"
        >
          Tables
        </Link>
        <Link
          href="/"
          className="block text-center text-darkPrimary border-b border-transparent py-1 hover:border-darkPrimary"
        >
          Chairs
        </Link>
        <Link
          href="/"
          className="block text-center border-b border-transparent py-1 hover:border-darkPrimary"
        >
          Crockery
        </Link>
        <Link
          href="/"
          className="block text-center border-b border-transparent py-1 hover:border-darkPrimary"
        >
          Cutlery
        </Link>
        <Link
          href="/products"
          className="block text-center border-b border-transparent py-1 hover:border-darkPrimary"
        >
          All Products
        </Link>
        <Link
          href="/about"
          className="block text-center border-b border-transparent py-1 hover:border-darkPrimary"
        >
          About
        </Link>
        <Link
          href="/admin"
          className="block text-center border-b border-transparent py-1 hover:border-darkPrimary"
        >
          Admin Pannel
        </Link>

        <div className="flex gap-4 justify-center">
          {/* User Icon */}
          <Link href="/" aria-label="User Profile">
            <div className="md:relative md:bottom-[5rem] lg:bottom-7 md:left-[3rem] lg:left-[-1rem] flex items-center justify-center w-6 h-6 rounded-full border border-transparent hover:bg-lightGray">
            <FaUserCircle/>
            </div>
          </Link>

          <Link href="/usercart" aria-label="Cart">
            <div className="md:relative md:bottom-[5rem] lg:bottom-7 md:left-[2.5rem] lg:left-[-2rem] flex items-center justify-center w-6 h-6 rounded-full border border-transparent hover:bg-lightGray">
            <FaShoppingCart/>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
