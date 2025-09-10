import { Hono } from "hono";
import prisma from "./lib/prisma.js";
import { bearerAuth } from "hono/bearer-auth";

const app = new Hono();

const token = "HonoIsGood";

app.use("/*", bearerAuth({ token }));

app.get("/gallery", async (c) => {
  const users = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });
  return c.json(users);
});

app.post("/gallery", async (c) => {
  try {
    const body = await c.req.json<{
      picture: string;
      age: number;
      enCategory: string;
      faCategory: string;
      farsiTitle: string;
      englishTitle: string;
      date: number;
      faDesc: string;
      enDesc: string;
      likes: number;
    }>();
    if (
      !body.picture ||
      !body.age ||
      !body.enCategory ||
      !body.faCategory ||
      body.farsiTitle ||
      !body.englishTitle ||
      !body.date ||
      !body.faDesc ||
      !body.enDesc ||
      !body.likes
    ) {
      return c.json({ success: false, error: "all fields required" }, 400);
    }
    const user = await prisma.gallery.create({ data: body });
    return c.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return c.json({ success: false, error: "Invalid request" }, 400);
  }
});

app.get("/messages", async (c) => {
  const messagesData = await prisma.connectionMessages.findMany({
    orderBy: { createdAt: "desc" },
  });
  return c.json({
    messages: messagesData,
  });
});
export default app;
