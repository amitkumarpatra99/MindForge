import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MindForge",
  description: "Your Second Brain",
};

import Providers from "./components/Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex h-screen overflow-hidden bg-white`}>
        <Providers>
          <Sidebar />
          <div className="flex-1 overflow-auto pt-16 md:pt-0">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}