import Image from "next/image";
import MarqueeText from "./components/Marquee";
import Banner from "./components/Banner";

export default function Home() {
  return (
    <div>
      <MarqueeText />
      <Banner />
    </div>
  );
}
