import { Hono } from "hono";
import prisma from "../lib/prisma.js";

const messages = new Hono();

messages.get("/", async (c) => {
  const messagesData = await prisma.connectionMessages.findMany({
    orderBy: { createdAt: "desc" },
  });
  return c.json({ messages: messagesData });
});

export default messages;
