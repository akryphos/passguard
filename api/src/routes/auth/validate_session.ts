import { createBaseElysia } from "@/base";
import { BadRequestException } from "@/plugins/exceptions";
import auth from "@lib/auth";
import db from "@lib/db";

const validate_session = createBaseElysia().post(
  "/validate_session",
  async ({ headers }) => {
    const authSession = headers.authorization?.split("Bearer ")[1];

    if (!authSession) throw new BadRequestException("Session not found");
    console.log(authSession);

    let { user } = await auth.validateSession(authSession);

    console.log(user);
    

    if (!user) throw new BadRequestException("Session Expired");

    const dbUser = await db.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    return {
      userId: dbUser?.id,
      name: dbUser?.name,
      email: dbUser?.email,
    };
  }
);

export default validate_session;
