import { createBaseElysia } from "@/base";
import auth from "@/lib/auth";
import db from "@lib/db";
import {
  ConflictException,
  InternalServerErrorException,
} from "@plugins/exceptions";
import { password as bunPassword } from "bun";
import { t } from "elysia";
import { generateId } from "lucia";

const register = createBaseElysia().post(
  "/register",
  async ({ body: { email, password, fullName }, cookie, set }) => {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new ConflictException("User already exists.");
    }

    const userId = generateId(15);

    const hashedPassword = await bunPassword.hash(password);

    try {
      const newUser = await db.user.create({
        data: {
          id: userId,
          email,
          fullName,
          hashedPassword: hashedPassword,
        },
      });
      const session = await auth.createSession(userId, {});
      const sessionCookie = auth.createSessionCookie(session.id);

      set.status = 201;
      cookie[sessionCookie.name]?.set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });

      return {
        userId: newUser.id,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  },
  {
    body: t.Object({
      email: t.String({
        format: "email",
      }),
      password: t.String({
        minLength: 8,
        maxLength: 64,
      }),
      fullName: t.String({
        minLength: 3,
        maxLength: 32,
      }),
    }),
  }
);

export default register;
