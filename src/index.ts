import { Hono } from "hono"

const app = new Hono()

app.get("/", (c) => c.text("API is running"));

app.get("/messages", (c) => c.json({"Messages": "nothing"}));

app.post("/messages", async (c) => {
    const body = await c.req.json()
    return c.json({ success: true, data: body })
})

export default app
