import { Poppins, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sheared/Navbar";
import Footer from "@/components/sheared/Footer";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "HireLoop",
  description:
    "A modern website that can people use for find there jobs and post job for people",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${poppins.className} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
