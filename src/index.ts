import { Hono } from "hono";

const app = new Hono();

app.get("/messages", (c) => c.text("API is running"));

app.post("/messages", async (c) => {
    try {
        const body = await c.req.json();
        return c.json({ success: true, data: body });
    } catch (error) {
        return c.json({ success: false, error: "Invalid request" }, 400);
    }
});

export default app;