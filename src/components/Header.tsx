import { Button } from "@heroui/react";
import Image from "next/image";
import Navlinks from "./Navlinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
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
            <h1 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
              বাজার দর
            </h1>

            <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">{date}</p>
          </div>
        </div>

        {/* Right Side - Authentication */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sign In Button */}
          <Button
            variant="outline"
            size="md"
            className="inline-block rounded-lg border-gray-300 font-semibold text-gray-700 hover:bg-gray-50"
          >
            সাইন ইন
          </Button>

          {/* Sign Up Button (With Green Theme Background) */}
          <Button
            variant="primary"
            size="md"
            className="inline-block rounded-lg bg-[#008a45] px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#007038] sm:text-base"
          >
            সাইন আপ
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-gray-100">
        <Navlinks />
      </div>
    </header>
  );
};

export default Header;