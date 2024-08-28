"use server";
import { redirect } from "next/navigation";
import { ActionResult } from "../(auth)/login/form/actions";
import { getUser, lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function handleLogout(): Promise<ActionResult> {
  const { session } = await getUser();

  if (!session) {
    return {
      errorTitle: "Error",
      errorDesc: ["Unauthorized"],
    };
  }

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/dashboard/login");
}
