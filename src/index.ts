import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

import galleryRoutes from "./routes/gallery.js";
import messageRoutes from "./routes/messages.js";
import login from "./routes/login.js";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "*",
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (c) => c.json({ ok: true, service: "portfolio-backend" }));

app.route("/gallery", galleryRoutes);
app.route("/messages", messageRoutes);
app.route("/login", login);

if (process.env.VERCEL !== "1") {
  serve({
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3002,
  });
}

export default app;
