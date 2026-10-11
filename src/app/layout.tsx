import type { Metadata } from "next";
import { Hind_Siliguri} from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import "react-toastify/dist/ReactToastify.css";

const HindSiliguri = Hind_Siliguri({
  subsets: ["latin" , "bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর | বাংলাদেশের দৈনিক বাজার মূল্য",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার দর, দাম বৃদ্ধি ও হ্রাস এবং বিভিন্ন বাজারের মূল্য এক নজরে দেখুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${HindSiliguri.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
