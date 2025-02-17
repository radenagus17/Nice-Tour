"use client";
import { FC, ReactNode } from "react";
import SeatProvider from "../providers/seat-provider";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <SeatProvider>
      {children}
      <Toaster />
    </SeatProvider>
  );
};

export default Layout;
