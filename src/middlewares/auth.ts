import { bearerAuth } from "hono/bearer-auth";

const token = process.env.bearerAuthToken!;

export const bearerAuthMiddleware = bearerAuth({ token });
