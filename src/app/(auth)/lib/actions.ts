"use server";
import { ActionResult } from "@/app/dashboard/(auth)/login/form/actions";
import { userSchema } from "./validations";
import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";

export async function signInUser(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const signInSchema = userSchema.pick({ email: true, password: true });

  const validate = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    const errorDesc = validate.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
    },
  });

  if (!existingUser) {
    return {
      errorTitle: "Error",
      errorDesc: ["Email tidak ditemukan"],
    };
  }

  const validPassword = await bcrypt.compare(
    validate.data.password,
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

  redirect("/");
}
export async function signUpUser(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = userSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passport: formData.get("passport"),
  });

  if (!validate.success) {
    const errorDesc = validate.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const hashingPassword = bcrypt.hashSync(validate.data.password, 10);

  await prisma.user.create({
    data: {
      email: validate.data.email,
      name: validate.data.name,
      password: hashingPassword,
      passport: validate.data.passport,
      role: "CUSTOMER",
    },
  });

  redirect("/sign-in");
}
