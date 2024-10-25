import prisma from "@lib/db";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, TimeSpan } from "lucia";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

const auth = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  sessionExpiresIn: new TimeSpan(1, "w"),
  getUserAttributes: (atr) => {
    return {
      name: atr.name,
      email: atr.email,
      avatar: atr.avatar,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof Lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  name: string;
  email: string;
  avatar?: string;
}

export default auth;
