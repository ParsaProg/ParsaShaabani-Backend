import { Context, Next } from "hono";
import { verify } from "hono/jwt";

// Define the secret key (in the .env)
const JWT_SECRET = process.env.JWT_SECRET || "";

export const authMiddleWare = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  console.log(JWT_SECRET);
  console.log(authHeader)

  // 1. Check if Authorization header exist
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized: Missing or invalid token" }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = await verify(token, JWT_SECRET);
    c.set("user", payload);
    await next();
  } catch (e) {
    return c.json({ error: "Unauthorized: Invalid token" }, 401);
  }
};
