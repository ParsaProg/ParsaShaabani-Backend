import { verify } from "hono/jwt";
export const authMiddleWare = async (c, next) => {
    const authHeader = c.req.header("Authorization");
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return c.json({ error: "Server authentication is not configured" }, 500);
    }
    // 1. Check if Authorization header exist
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return c.json({ error: "Unauthorized: Missing or invalid token" }, 401);
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = await verify(token, jwtSecret);
        c.set("user", payload);
        await next();
    }
    catch (e) {
        return c.json({ error: "Unauthorized: Invalid token" }, 401);
    }
};
