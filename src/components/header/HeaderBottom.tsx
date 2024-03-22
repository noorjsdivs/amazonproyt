"use client";
import { signOut, useSession } from "next-auth/react";
import { LuMenu } from "react-icons/lu";

const HeaderBottom = () => {
  const { data: session } = useSession();
  return (
    <div className="w-full h-10 bg-amazon_light flex items-center text-sm text-white px-4">
      <p className="flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <LuMenu className="text-xl" /> All
      </p>
      <p className="hidden md:inline-flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Todays Deals
      </p>
      <p className="hidden md:inline-flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Customer Service
      </p>
      <p className="hidden md:inline-flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Registry
      </p>
      <p className="hidden md:inline-flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Gift Cards
      </p>
      <p className="hidden md:inline-flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Sell
      </p>
      {session?.user && (
        <button
          onClick={() => signOut()}
          className="flex items-center gap-1 h-8 px-2 border border-transparent hover:border-red-600 cursor-pointer duration-300 text-amazon_yellow hover:text-red-400"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default HeaderBottom;
