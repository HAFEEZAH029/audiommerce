import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import {prisma} from "./prisma";

const SESSION_COOKIE = "session_id";

export async function createSession(userId: string) {
  const sessionId = uuidv4();
  const cookieStore = await cookies();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt,
    },
  });

  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: true,
    path: "/",
    expires: expiresAt,
  });
}