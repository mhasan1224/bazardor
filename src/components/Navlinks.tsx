import Link from "next/link";

interface NavItems {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navlinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const navs: NavItems[] = await res.json();

  return (
    <nav className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="flex items-center justify-start gap-6 overflow-x-auto py-3 text-lg">
        {navs.map((link) => (
          <Link
            key={link.slug}
            href={`/category/${link.slug}`}
            className="shrink-0 transition-colors hover:text-green-700"
          >
            {link.icon} {link.nameBn}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navlinks;