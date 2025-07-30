import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/client-providers"; 
import { FaTwitter, FaLinkedin } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mini Project",
  description: "MiniPro App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-[url('/bg.jpg')] opacity-50 fixed -z-10 inset-0" />
        <ClientProviders>
          {children}
        </ClientProviders>
        <footer className="bg-blue-500 text-white py-10">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">
              {/* Support Section */}
              <div>
                <h3 className="text-2xl font-bold">Need help with anything?</h3>
                <div className="flex items-center gap-3 mt-4">
                  <a href="#" className="bg-white p-2 rounded-full text-blue-500">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" className="bg-white p-2 rounded-full text-blue-500">
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </div>

              {/* Navigation Links */}
              <div>
                <h4 className="font-bold text-lg">Home</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li><a href="#how-it-works">How it works</a></li>
                  <li><a href="#why-its-important">Why it’s important</a></li>
                </ul>
              </div>

              {/* Company Info */}
              <div>
                <h4 className="font-bold text-lg">Minipro</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li><a href="#about-us">About</a></li>
                  <li><a href="#">Blog</a></li>
                </ul>
              </div>

              {/* Legal and Help Links */}
              <div>
                <h4 className="font-bold text-lg">Legal</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li><a href="#">Terms & Conditions</a></li>
                  <li><a href="#">Privacy & Policy</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">FAQs</a></li>
                </ul>
              </div>

            </div>
        </footer>
      </body>
    </html>
  );
}
