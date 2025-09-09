import { Hono } from "hono";

const app = new Hono();

app.get("/messages", (C) => C.text("Api is running "));

app.post("/messages", async (message) => {
  const body = await message.req.json();
  return message.json({ success: true, data: body });
});
