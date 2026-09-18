"use server";

import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession } from "./session";

type FormState = {
  errors?: Record<string, string>;
  success?: boolean;
  name?: string;
  email?: string;};

export async function signup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const errors: Record<string, string> = {};

  const name = (formData.get("name") as string) ?? "";
  const email = (formData.get("email") as string) ?? "";
  const password = (formData.get("password") as string) ?? "";

  if (!name || name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Invalid email";
  }

  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, name, email };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      errors: {
        email: "Email already in use",
      },
      name,
      email,    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await createSession(newUser.id);
  redirect("/");
}

export async function login(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const errors: Record<string, string> = {};

  const email = (formData.get("email") as string) ?? "";
  const password = (formData.get("password") as string) ?? "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) errors.email = "Invalid email";
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors).length > 0) return { errors, email };

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { errors: { email: "User not found" }, email };
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return { errors: { password: "Incorrect password" }, email };
  }

  await createSession(user.id);
  redirect("/");
}

