import MarqueeText from "../components/Marquee";
import Banner from "../components/Banner";
import ProductSection from "@/components/ProductSection";
import productService from "@/services/product.service";
export default async function Home() {
  const products = await productService();
  const increasedProducts = products.filter(
    (product) => product.change.dir === "up",
  );

  const decreasedProducts = products.filter(
    (product) => product.change.dir === "down",
  );
  return (
    <div>
      {" "}
      <MarqueeText />
      <Banner />{" "}
      <ProductSection
        title="আজ দাম বেড়েছে"
        // subtitle="যেসব পণ্যের দাম আজ বেড়েছে"
        products={increasedProducts}
        id="price-increased"
      />
      <ProductSection
        title="আজ দাম কমেছে"
        // subtitle="যেসব পণ্যের দাম আজ কমেছে"
        products={decreasedProducts}
        id="price-decreased"
      />
      <ProductSection
        title="সব পণ্য"
        subtitle="মোট ৩৩টি পণ্য দেখানো হচ্ছে"
        products={products}
        id="products"
      />{" "}
    </div>
  );
}
