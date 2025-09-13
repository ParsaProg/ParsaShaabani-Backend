import { Hono } from "hono";
import { cors } from "hono/cors";
import { bearerAuthMiddleware } from "./middlewares/auth.js";
import galleryRoutes from "./routes/gallery.js";
import messageRoutes from "./routes/messages.js";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "*", // or "http://localhost:3000" for stricter setup
    allowHeaders: ["Authorization", "Content-Type"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use("/*", bearerAuthMiddleware);

// روت‌ها
app.route("/gallery", galleryRoutes);
app.route("/messages", messageRoutes);

export default app;
