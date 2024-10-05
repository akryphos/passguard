import { createBaseElysia } from "@/base";
import auth from "@/lib/auth";
import db from "@lib/db";
import { BadRequestException } from "@plugins/exceptions";
import { password as bunPassword } from "bun";
import { t } from "elysia";

const login = createBaseElysia().post(
  "/login",
  async ({ body: { email, password }, cookie, set }) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user.hashedPassword) {
      console.error("User not found.");
      throw new BadRequestException("User not found.");
    }

    const passwordValid = bunPassword.verify(password, user.hashedPassword);

    if (!passwordValid) {
      console.error("Password is invalid.");
      throw new BadRequestException("Password is invalid.");
    }

    const session = await auth.createSession(user.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);

    set.status = 200;

    cookie[sessionCookie.name]?.set({
      value: sessionCookie.value,
      ...sessionCookie.attributes,
    });

    return {
      userId: user.id,
    };
  },
  {
    body: t.Object({
      email: t.String({
        format: "email",
      }),
      password: t.String(),
    }),
  }
);

export default login;
