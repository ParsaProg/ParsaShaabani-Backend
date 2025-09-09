import {Hono} from "hono"
import { serve } from '@hono/node-server'

const app = new Hono();

app.get("/messages", (C) => C.text("Api is running "))

app.post("/messages", async (message) => {
    const body = await message.req.json();
    return message.json({"success": true, "data": body})
})

serve({
    fetch: app.fetch,
    port: 3001
})