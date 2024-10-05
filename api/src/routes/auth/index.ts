import { createBaseElysia } from "@/base";
import login from "./login";
import logout from "./logout";
import register from "./register";
import validate_session from "./validate_session";

const auth = createBaseElysia({
  prefix: "/auth",
})
  .use(login)
  .use(register)
  .use(logout)
  .use(validate_session);

export default auth;
