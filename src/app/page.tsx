import Image from "next/image";
import MarqueeText from "./components/Marquee";

export default function Home() {
  return (
    <div>
      <MarqueeText />
      
      আজকের বাজারের দাম এক নজরে <br />
      চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম
      — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক
      জায়গায়।
    </div>
  );
}
