import Marquee from "react-fast-marquee";

interface HeadLines {
  id: number;
  categoryIcon: string;
  nameBn: string;
  today: string;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
}

const MarqueeText = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const headlines: HeadLines[] = await res.json();

  return (
    <div className="border-y border-gray-200 bg-gray-50 py-2">
      <Marquee
        direction="left"
        speed={100}
        pauseOnHover
        gradient={false}
      >
        {headlines.map((h) => {
          const isUp = h.change.dir === "up";

          return (
            <div
              key={h.id}
              className="flex items-center whitespace-nowrap text-sm md:text-base"
            >
              {/* Product Name */}
              <span className="font-semibold text-gray-900">
                {h.nameBn}
              </span>

              {/* Price */}
              <span className="ml-2 text-gray-700">
                {h.today} টাকা/{h.unit}
              </span>

              {/* Change */}
              <span
                className={`ml-2 font-semibold ${
                  isUp ? "text-red-600" : "text-green-600"
                }`}
              >
                {isUp ? "▲" : "▼"} {h.change.pct}%
              </span>

              {/* Separator */}
              <span className="mx-3 h-6 w-px shrink-0 bg-gray-300" />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default MarqueeText;