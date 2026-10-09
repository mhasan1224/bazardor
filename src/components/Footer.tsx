import Link from "next/link";
import { Link as LinkIcon, Sprout } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-8 border-t border-gray-200 bg-white text-gray-800">
      <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href="/" className="mb-2 inline-flex items-center gap-2">
              <Image
                          src="/assets/Stack.png"
                          alt="বাজার দর"
                          width={10}
                          height={10}
                          className="h-6 w-6 object-contain sm:h-6 sm:w-6"
                          priority
                        />
              <span className="text-xl font-bold">বাজার দর</span>
            </Link>

            <p className="max-w-sm text-sm leading-6 text-gray-600">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">দ্রুত লিংক</h3>

            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-green-700">হোম</Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-green-700">
                  সব পণ্য
                </Link>
              </li>
              <li>
                <Link href="/#price-increased" className="hover:text-green-700">
                  দাম বেড়েছে
                </Link>
              </li>
              <li>
                <Link href="/#price-decreased" className="hover:text-green-700">
                  দাম কমেছে
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">আমাদের অনুসরণ করুন</h3>

            <div className="flex gap-3">
              <a
                href="https://github.com/mhasan1224"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-md border border-gray-200 p-2 transition hover:bg-green-50 hover:text-green-700"
              >
                <LinkIcon size={20} />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-md border border-gray-200 p-2 transition hover:bg-green-50 hover:text-green-700"
              >
                <LinkIcon size={20} />
              </a>
            </div>

            <p className="mt-3 text-sm text-gray-600">
              মতামত ও পরামর্শ দিয়ে আমাদের সহযোগিতা করুন।
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="mb-2 text-xs leading-5 text-gray-500">
            সকল দাম সম্ভাব্য; বাজারের অবস্থার ওপর নির্ভর করে পরিবর্তিত হতে পারে।
          </p>

          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;