import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import galleryRoutes from "./routes/gallery.js";
import messageRoutes from "./routes/messages.js";
import { loginHandler, logoutHandler } from "./middlewares/auth.js";
const app = new Hono();
app.use("/*", cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.post("/login", loginHandler);
app.post("/logout", logoutHandler);
app.route("/gallery", galleryRoutes);
app.route("/messages", messageRoutes);
// ✅ این خط مهم‌ترینه
serve({
    fetch: app.fetch,
    port: 3000,
});
console.log("✅ Server running on http://localhost:3000");
