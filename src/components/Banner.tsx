import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const bannerContent = {
    title: "আজকের বাজারের দাম এক নজরে",
    description:
      "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।",
    buttonText: "সব পণ্য দেখুন",
    buttonLink: "/#products",
    image: "/assets/bazar-hero.png",
    imageAlt: "বাজারের বিভিন্ন পণ্যের ঝুড়ি",
  };

  return (
    <section className="bg-[#f2f6f3] py-8 sm:py-12 md:py-16">
      {/* Container applied here */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-100 bg-[#f7fbf8] p-6 shadow-sm sm:p-10 lg:p-14">
          <div className="flex flex-col-reverse items-center justify-between gap-8 lg:flex-row lg:gap-12">
            {/* Content */}
            <div className="w-full text-left lg:max-w-xl">
              {/* Date Badge */}
              <div className="mb-6 inline-block rounded-full bg-[#e1efe6] px-4 py-1.5 text-xs font-medium text-[#1e613b] sm:text-sm">
                {date}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
                {bannerContent.title}
              </h1>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
                {bannerContent.description}
              </p>

              {/* Button */}
              <div className="mt-8">
                <Link
                  href={bannerContent.buttonLink}
                  className="inline-block rounded-lg bg-[#008a45] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#007038] sm:text-base"
                >
                  {bannerContent.buttonText}
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative flex w-full justify-center lg:w-auto lg:justify-end">
              <div className="relative w-64 sm:w-80 md:w-96 lg:w-[420px]">
                <Image
                  src={bannerContent.image}
                  alt={bannerContent.imageAlt}
                  width={500}
                  height={500}
                  priority
                  className="h-auto w-full object-contain"
                />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;