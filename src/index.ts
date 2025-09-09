import { Hono } from "hono"

const app = new Hono()

app.get("/messages", (c) => c.text("API is running"))

app.post("/messages", async (c) => {
    const body = await c.req.json()
    return c.json({ success: true, data: body })
})

export default app
