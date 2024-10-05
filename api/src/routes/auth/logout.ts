import { createBaseElysia } from "@/base";
import auth from "@/lib/auth";
import { BadRequestException } from "@plugins/exceptions";

const logout = createBaseElysia().post("/logout", async ({ cookie }) => {
  console.log("hit");
  
  const sessionCookie = cookie[auth.sessionCookieName];  

  if (!sessionCookie?.value) {
    const e =  new BadRequestException("Session not found");
    throw e;
    
  }
  await auth.invalidateSession(sessionCookie.value);
  const blankSessionCookie = auth.createBlankSessionCookie();

  sessionCookie.set({
    value: blankSessionCookie.value,
    ...blankSessionCookie.attributes,
  });
});

export default logout;
