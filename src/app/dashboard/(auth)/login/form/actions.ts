"use server";

import { redirect } from "next/navigation";
import { formSchema } from "./validations";
import prisma from "../../../../../../lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";

export interface ActionResult {
  errorTitle: string | null;
  errorDesc: string[] | null;
}

export async function handleLogin(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  // console.log(formData.get("email"));
  const values = formSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: values.data.email,
    },
  });

  if (!existingUser) {
    return {
      errorTitle: "Error",
      errorDesc: ["Email tidak ditemukan"],
    };
  }

  const validPassword = await bcrypt.compare(
    values.data.password,
    existingUser.password
  );

  if (!validPassword) {
    return {
      errorTitle: "Error",
      errorDesc: ["Email/Password Salah"],
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = await lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/dashboard");
}
