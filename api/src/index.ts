import authRoutes from "@routes/auth";
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia().use(swagger());

app
  .group("/api", (app) => {
    app.use(authRoutes);
    return app;
  })
  .listen(process.env.PORT || 3049);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
