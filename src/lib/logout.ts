"use server";

import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "session_id";

export async function logout() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  // 🧠 Step 1: Delete session from DB
  if (sessionId) {
    await prisma.session.deleteMany({
      where: { id: sessionId },
    });
  }

  // 🧠 Step 2: Remove cookie
  cookieStore.delete(SESSION_COOKIE);

  // 🧠 Step 3: Redirect user
  redirect("/");
}