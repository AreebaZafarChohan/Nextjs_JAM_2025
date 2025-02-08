"use client";
import React, { useState } from "react";
import Image from "next/image";
const TopHeader = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const languages = ["English", "Urdu", "Arabic", "French", "German"];
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };
  return (
    <header className="w-full h-[38px] absolute top-0 bg-black py-[9px] flex justify-center items-center">
      <div className="flex justify-center gap-x-[20px] items-center text-white w-full max-w-[1200px] px-4">
        <div className="flex items-center gap-x-[10px]">
          <div className="flex flex-col justify-center items-center relative">
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="text-white font-satoshi font-medium rounded-lg text-sm text-center inline-flex items-center"
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedLanguage}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                id="dropdownHover"
                className="z-10 absolute mt-[240px] ml-[-90px] sm:ml-[-50px] bg-black divide-y divide-gray-700 rounded-lg shadow-sm sm:w-44 w-32"
              >
                <ul
                  className="py-2 text-sm text-white"
                  aria-labelledby="dropdownHoverButton"
                >
                  {languages.map((language) => (
                    <li key={language}>
                      <button
                        onClick={() => handleLanguageChange(language)}
                        className="block w-full px-4 py-2 hover:bg-gray-700 text-left"
                      >
                        {language}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Image
            src="/Frame (32).svg"
            alt=""
            height={20}
            width={20}
            className="h-[20px] w-[20px] hidden"
          />
        </div>
      </div>
    </header>
  );
};

export default TopHeader;