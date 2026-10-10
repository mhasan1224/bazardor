import Link from "next/link";
import Image from "next/image";
import Navlinks from "./Navlinks";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="container mx-auto flex min-h-16 items-center justify-between gap-3 px-4 py-3 md:min-h-20 md:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="বাজার দর - হোম পেজ"
          className="flex min-w-0 items-center gap-2 transition-opacity hover:opacity-80 sm:gap-3"
        >
          <Image
            src="/assets/Stack.png"
            alt="বাজার দর লোগো"
            width={60}
            height={60}
            priority
            className="h-9 w-9 shrink-0 object-contain sm:h-12 sm:w-12"
          />

          <div className="min-w-0">
            <h1 className="text-lg font-bold leading-tight text-gray-900 sm:text-2xl">
              বাজার দর
            </h1>

            <p className="mt-1 text-[10px] leading-4 text-gray-500 sm:text-sm">
              {date}
            </p>
          </div>
        </Link>
        <UserInfo />
        
      </div>

      <div className="border-t border-gray-100">
        <Navlinks />
      </div>
    </header>
  );
};

export default Header;