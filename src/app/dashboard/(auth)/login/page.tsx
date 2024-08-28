import { Metadata } from "next";
import React, { FC } from "react";
import FormLogin from "./form";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

interface LoginPageProps {}

export const metadata: Metadata = {
  title: "Dashboard | Log-in",
};

const LoginPage: FC<LoginPageProps> = async ({}) => {
  const { user, session } = await getUser();

  if (session && user.role === "ADMIN") {
    redirect("/dashboard");
  }

  return <FormLogin />;
};

export default LoginPage;
