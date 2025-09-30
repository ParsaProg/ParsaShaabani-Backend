import { Hono } from "hono";
import prisma from "../lib/prisma.js";

const gallery = new Hono();

// GET /gallery
gallery.get("/", async (c) => {
  const users = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });
  return c.json(users);
});

// POST /gallery
gallery.post("/", async (c) => {
  try {
    const body = await c.req.json<{
      picture: string;
      age: number;
      enCategory: string;
      faCategory: string;
      farsiTitle: string;
      englishTitle: string;
      date: string;
      faDesc: string;
      enDesc: string;
      likes: number;
    }>();

    if (
      !body.picture ||
      body.age === undefined ||
      !body.enCategory ||
      !body.faCategory ||
      !body.farsiTitle ||
      !body.englishTitle ||
      body.date === undefined ||
      !body.faDesc ||
      !body.enDesc ||
      body.likes === undefined
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

gallery.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json<{
    picture: string;
    age: number;
    enCategory: string;
    faCategory: string;
    farsiTitle: string;
    englishTitle: string;
    date: string;
    faDesc: string;
    enDesc: string;
    likes: number;
  }>();

  if (
    !body.picture ||
    body.age === undefined ||
    !body.enCategory ||
    !body.faCategory ||
    !body.farsiTitle ||
    !body.englishTitle ||
    body.date === undefined ||
    !body.faDesc ||
    !body.enDesc ||
    body.likes === undefined
  ) {
    return c.json({ success: false, message: "All fields required" });
  }

  try {
    const user = await prisma.gallery.update({
      where: { id: Number(id) },
      data: body,
    });
    return c.json({ success: true, user: user });
  } catch(err: any) {
    throw new Error("Can't edit data with error: " + err);
  }
});

export default gallery;
