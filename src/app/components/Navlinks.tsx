import Link from "next/link";
import React from "react";

interface NavItems {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navlinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );

  const data = await res.json();
  const navs: NavItems[] = data;

  return (
    <nav className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="flex items-center justify-start gap-6 py-3 text-lg">
        {navs.map((link) => (
          <Link key={link.slug} href={link.slug}>
            {link.icon} {link.nameBn}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navlinks;