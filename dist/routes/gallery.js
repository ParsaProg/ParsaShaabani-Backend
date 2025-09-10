import { Hono } from "hono";
import prisma from "../lib/prisma";
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
        const body = await c.req.json();
        if (!body.picture ||
            body.age === undefined ||
            !body.enCategory ||
            !body.faCategory ||
            !body.farsiTitle ||
            !body.englishTitle ||
            body.date === undefined ||
            !body.faDesc ||
            !body.enDesc ||
            body.likes === undefined) {
            return c.json({ success: false, error: "all fields required" }, 400);
        }
        const user = await prisma.gallery.create({ data: body });
        return c.json({ success: true, data: user });
    }
    catch (error) {
        console.error(error);
        return c.json({ success: false, error: "Invalid request" }, 400);
    }
});
export default gallery;
