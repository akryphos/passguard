import { createBaseElysia } from "@/base";
import { BadRequestException } from "@/plugins/exceptions";
import auth from "@lib/auth";
import db from "@lib/db";

const validate_session = createBaseElysia().post(
  "/validate_session",
  async ({ headers, cookie, set }) => {
    const authSession = headers.authorization?.split("Bearer ")[1];

    if (!authSession) throw new BadRequestException("Session not found");

    let { user } = await auth.validateSession(authSession);

    if (!user) {
      const sessionCookie = auth.createBlankSessionCookie();
      cookie[sessionCookie.name]?.set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });

      set.status = 400;
      return {
        message: "Session Expired",
      };
    }

    const dbUser = await db.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    return {
      userId: dbUser?.id,
      fullName: dbUser?.fullName,
      email: dbUser?.email,
    };
  }
);

export default validate_session;
