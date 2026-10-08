import { Button } from "@heroui/react";
import Image from "next/image";
import React from "react";
import Navlinks from "./Navlinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex min-h-20 items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
        {/* Left Side - Logo & Brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/assets/Stack.png"
            alt="বাজার দর"
            width={60}
            height={60}
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
            priority
          />

          <div>
            <h1 className="text-xl font-bold leading-tight text-black sm:text-2xl">
              বাজার দর
            </h1>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">{date}</p>
          </div>
        </div>

        {/* Right Side - Authentication */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="font-medium sm:h-10 sm:px-5"
          >
            সাইন ইন
          </Button>

          <Button
            variant="primary"
            size="sm"
            className="font-medium sm:h-10 sm:px-5"
          >
            সাইন আপ
          </Button>
        </div>
      </div>
       {/* Navigation */}
      <div className="col-span-1 md:col-span-3">
        <Navlinks />
      </div>
    </header>
  );
};

export default Header;
