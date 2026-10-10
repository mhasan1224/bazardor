"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
}

interface CategoryNavClientProps {
  navs: NavItem[];
}

const CategoryNavClient = ({ navs }: CategoryNavClientProps) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="container mx-auto px-4 md:px-6 lg:px-8"
    >
      <div className="flex items-center gap-3 overflow-x-auto py-2.5 text-sm sm:gap-5 sm:py-3 sm:text-base md:gap-6 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {navs.map((item) => {
          const isActive = pathname === `/category/${item.slug}`;

          return (
            <Link
              key={item.id}
              href={`/category/${item.slug}`}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 ${
                isActive
                  ? "bg-green-100 text-green-800"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryNavClient;