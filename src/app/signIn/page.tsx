"use client";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => signIn("github")}
          className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-4"
        >
          Sign in with GitHub
        </button>
        <button
          onClick={() => signIn("credentials")}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Sign in with Email
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
