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
      throw new BadRequestException("Wrong Email or Password!");
    }

    const passwordValid = await bunPassword.verify(
      password,
      user.hashedPassword
    );

    if (!passwordValid) {
      throw new BadRequestException("Wrong Email or Password!");
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
