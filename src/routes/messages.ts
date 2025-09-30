import { Hono } from "hono";
import prisma from "../lib/prisma.js";

const messages = new Hono();

messages.get("/", async (c) => {
  const messagesData = await prisma.connectionMessages.findMany({
    orderBy: { createdAt: "desc" },
  });
  return c.json({ messages: messagesData });
});

messages.post("/", async (c) => {
  try {
    const body = await c.req.json<{
      fullName: string;
      email: string;
      Message: string;
    }>();

    if (!body.fullName || !body.email || !body.Message) {
      return c.json({ success: false, error: "all fields required" }, 400);
    }

    const user = await prisma.connectionMessages.create({ data: body });
    return c.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return c.json({ success: false, error: "Invalid request" }, 400);
  }
});

messages.delete("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const deletedMessage = await prisma.connectionMessages.delete({
      where: { id: Number(id) },
    });
    return c.json({ success: true, deletedMessage: deletedMessage });
  } catch {
    return c.json({ success: false, error: "Invalid request" }, 400);
  }
});

export default messages;
