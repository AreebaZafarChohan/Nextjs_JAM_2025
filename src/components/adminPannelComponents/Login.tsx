"use client";
import { useState, FormEvent } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Dashboard from "./Dashboard";

// Mock user data for authentication
const mockUser = {
  password: process.env.ADMIN_PANNEL_PASSWORD || "AreNab715"
};

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === mockUser.password) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const changeTheme = (theme: string) => {
    if (theme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    } else if (theme === "light") {
      setIsDarkMode(false);
      document.body.classList.remove("dark");
    }
    setIsDropdownOpen(false);
  };

  if (isLoggedIn) {
    return (
<div>
         {/* Change Theme Button */}
      <div className="absolute top-5 right-5">
      <button 
        onClick={toggleDropdown} 
        className="bg-gray-200 dark:bg-gray-700/65  rounded-md p-4 text-white dark:text-black"
      >
        Change Theme
      </button>

      {isDropdownOpen && (
        <div className="mt-2 absolute top-12 right-5 bg-white dark:bg-gray-800/65 rounded-md shadow-lg py-4 px-8 w-48">
          <button 
            onClick={() => changeTheme("light")} 
            className="block text-gray-800 dark:text-white w-full text-left p-2 border-b border-transparent hover:border-white transition-all duration-300 ease-in-out"
          >
            Light Theme
          </button>
          <button 
            onClick={() => changeTheme("dark")} 
            className="block text-gray-800 dark:text-white w-full text-left p-2 border-b border-transparent hover:border-white transition-all duration-300 ease-in-out"
          >
            Dark Theme
          </button>
        </div>
      )}
    </div>
      <div className={`p-8 font-sans ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
        <h1 className={` ${isDarkMode ? "bg-teal-400 text-white" : "bg-gray-950/25 text-white"} text-3xl mb-4 text-center font-serif font-bold my-12 py-8 bg-gray-950/25 rounded-md`}>Welcome, {username} to Admin Pannel!</h1>
       <Dashboard />
      </div>
      </div>
    );
  }

  return (
    <div className={`my-[8rem] p-8 max-w-md mx-auto shadow-md rounded-lg font-clash font-bold`}>
      <h1 className="text-2xl font-bold mb-1 text-center">Login to Admin Pannel</h1>
      <p className="text-base font-normal text-center text-red-500 pb-10 font-satoshi">(Warning: Only Admins are allowed here)</p>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-2">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">Password:</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}
