"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";
import { handleLogout } from "../actions";

const BtnLogout = () => {
  return (
    <form action={handleLogout}>
      <Button variant={"destructive"} className="w-full justify-start">
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </form>
  );
};

export default BtnLogout;
