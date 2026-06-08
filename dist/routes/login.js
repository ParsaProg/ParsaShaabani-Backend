import { Hono } from "hono";
import { sign } from "hono/jwt";
const login = new Hono();
login.get("/", async (c) => {
    const payload = {
        sub: "user123",
    };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return c.json({ error: "Configuration error" }, 500);
    }
    const token = await sign(payload, secret);
    return c.json({ token });
});
export default login;
