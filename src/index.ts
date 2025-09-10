import { Hono } from "hono";
import { bearerAuthMiddleware } from "./middlewares/auth";
import galleryRoutes from "./routes/gallery";
import messageRoutes from "./routes/messages";

const app = new Hono();

app.use("/*", bearerAuthMiddleware);

// روت‌ها
app.route("/gallery", galleryRoutes);
app.route("/messages", messageRoutes);

export default app;
