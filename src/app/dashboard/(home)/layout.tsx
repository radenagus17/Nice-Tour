import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../../globals.css";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpenText, LogOut, Plane, Ticket, User } from "lucide-react";
import BtnLogout from "./components/BtnLogout";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function HomeDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, session } = await getUser();

  if (session === null || user.role === "CUSTOMER") {
    redirect("/dashboard/login");
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} bg-background font-sans`}>
        <main>
          <nav className="border-b border-muted p-5">
            <div className="flex flex-row items-center justify-between">
              <span className="font-bold text-primary">NiceTour Dashboard</span>
            </div>
          </nav>
          <article className="flex flex-row gap-5 items-start flex-nowrap">
            <section className="grow-0 w-[20%] h-screen shadow p-5 space-y-5">
              <div className="space-y-2">
                <Button
                  asChild
                  variant={"ghost"}
                  className="w-full justify-start"
                >
                  <Link href={"/dashboard"}>Dashboard</Link>
                </Button>
              </div>

              <div className="space-y-2">
                <div className="uppercase text-xs font-bold">Master Data</div>

                <Button
                  variant={"ghost"}
                  asChild
                  className="w-full justify-start"
                >
                  <Link href={"/dashboard/airplanes"}>
                    <Plane className="w-4 h-4 mr-2" />
                    Airplanes
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  asChild
                  className="w-full justify-start"
                >
                  <Link href={"/dashboard/flights"}>
                    <BookOpenText className="w-4 h-4 mr-2" />
                    Flights
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  asChild
                  className="w-full justify-start"
                >
                  <Link href={"/dashboard/tickets"}>
                    <Ticket className="w-4 h-4 mr-2" />
                    Tickets
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  asChild
                  className="w-full justify-start"
                >
                  <Link href={"/dashboard/customers"}>
                    <User className="w-4 h-4 mr-2" />
                    Customers
                  </Link>
                </Button>
              </div>

              <div className="space-y-2">
                <BtnLogout />
              </div>
            </section>
            <section className="grow mr-5 mt-5 h-[87vh] overflow-y-auto">
              {children}
            </section>
          </article>
        </main>
      </body>
    </html>
  );
}
