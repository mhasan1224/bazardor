import CategoryNavClient from "@/components/CategoryNavClient";

interface NavItem {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navlinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  const navs: NavItem[] = await res.json();

  return <CategoryNavClient navs={navs} />;
};

export default Navlinks;