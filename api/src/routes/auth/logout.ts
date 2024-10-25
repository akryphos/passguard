import { createBaseElysia } from "@/base";
import auth from "@/lib/auth";
import { BadRequestException } from "@plugins/exceptions";

const logout = createBaseElysia().post("/logout", async ({ headers }) => {
  const authSession = headers.authorization?.split("Bearer ")[1];
  if (!authSession) throw new BadRequestException("Session not found");

  await auth.invalidateSession(authSession);

  return {
    message: "Logged out",
  };
});

export default logout;
