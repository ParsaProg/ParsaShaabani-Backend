import { Hono } from "hono";
import { sign } from "hono/jwt";

const login = new Hono();

login.get("/", async (c) => {
  const payload = {
    sub: "user123",
  };
  const secret = process.env.JWT_SECRET;
  const token = await sign(payload, secret);
  localStorage.setItem("accessToken", token);
  return c.json({ token });
});

export default login;
