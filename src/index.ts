import { Hono } from "hono";
import { bearerAuthMiddleware } from "./middlewares/auth.js";
import galleryRoutes from "./routes/gallery.js";
import messageRoutes from "./routes/messages.js";

const app = new Hono();

app.use("/*", bearerAuthMiddleware);

// روت‌ها
app.route("/gallery", galleryRoutes);
app.route("/messages", messageRoutes);

export default app;
