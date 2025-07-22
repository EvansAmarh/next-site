import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/client-providers"; 

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
        <footer className="bg-pink-100 py-12 bg-opacity-5">
          <div className="mx-auto px-4 text-center text-gray-900">
            <p>Made by Benz</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
