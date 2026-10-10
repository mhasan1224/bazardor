import Marquee from "react-fast-marquee";

interface HeadLines {
  id: number;
  categoryIcon: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const formatUnit = (unit: string): string => {
  const units: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    litre: "লিটার",
    pcs: "টি",
    piece: "টি",
    dozen: "ডজন",
    maund: "মণ",
  };

  return units[unit.toLowerCase()] ?? unit;
};

const MarqueeText = async () => {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const headlines: HeadLines[] = await res.json();

  return (
    <div className="border-y border-gray-200 bg-gray-50 py-2">
      <Marquee direction="left" speed={60} pauseOnHover gradient={false}>
        {headlines.map((h) => {
          const isUp = h.change.dir === "up";
          const isFlat = h.change.pct === 0;

          return (
            <div
              key={h.id}
              className="flex items-center whitespace-nowrap text-sm md:text-base"
            >
              <span className="mr-1.5" aria-hidden="true">
                {h.categoryIcon || "🛒"}
              </span>

              <span className="font-semibold text-gray-900">{h.nameBn}</span>

              <span className="ml-2 text-gray-700">
                {formatNumber(h.today)} টাকা/{formatUnit(h.unit)}
              </span>

              <span
                className={`ml-2 font-semibold ${
                  isFlat
                    ? "text-gray-500"
                    : isUp
                      ? "text-red-600"
                      : "text-green-600"
                }`}
              >
                {isFlat ? "—" : isUp ? "▲" : "▼"} {formatNumber(h.change.pct)}%
              </span>

              <span
                className="mx-4 h-6 w-px shrink-0 bg-gray-300"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default MarqueeText;
