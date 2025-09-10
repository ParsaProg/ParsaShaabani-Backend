import { Hono } from "hono";
import { prisma } from "./lib/prisma.js";

interface User{
    name: string;
    age: number;
}

const app = new Hono();


app.get("/users", async (c) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return c.json(users);
});

app.post("/users", async (c) => {
  try {
    const body = await c.req.json<{ name: string; age: number }>();

    if (!body.name || !body.age) {
      return c.json({ success: false, error: "name and age required" }, 400);
    }

    const user = await prisma.user.create({
      data: {
        name: body.name,
        age: body.age,
      },
    });

    return c.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return c.json({ success: false, error: "Invalid request" }, 400);
  }
});

export default app;