import type { Metadata } from "next";
import { Poppins, Inter as FontSans } from "next/font/google";
import "../globals.css";

import { cn } from "@/lib/utils";
import Navbar from "../components/navbar";
import CompanyLogos from "../components/company-logos";

const fontPoppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Nice Tour | Authentication",
};

export default function LandingAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontPoppins.className} text-white bg-flysha-black`}>
        <section className="bg-[url('/assets/images/background/airplane.png')] bg-no-repeat bg-cover bg-left-top -z-10 min-h-screen">
          <div className="Header-content bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)] z=0 min-h-screen">
            <Navbar />
            <div className="flex flex-col justify-between min-h-[calc(100vh-78px)]">
              <div className="form-section container max-w-[1130px] w-full mx-auto flex flex-col gap-[30px] mt-[53px]">
                {children}
              </div>
              <CompanyLogos />
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
