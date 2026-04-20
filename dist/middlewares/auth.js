import { sign, verify } from 'hono/jwt';
import { setCookie, getCookie, deleteCookie } from 'hono/cookie';
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET)
    throw new Error('JWT_SECRET not set');
// ========================
// Generate Token
// ========================
export const createToken = async (payload) => {
    return await sign({
        ...payload,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 1 day
    }, JWT_SECRET);
};
// ========================
// Login (set cookie)
// ========================
export const loginHandler = async (c) => {
    const { username, password } = await c.req.json();
    // ⚠️ اینو بعداً با دیتابیس عوض کن
    if (username !== 'admin' || password !== '1234') {
        return c.json({ error: 'Invalid credentials' }, 401);
    }
    const token = await createToken({
        id: '1',
        username: 'admin',
    });
    setCookie(c, 'token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        path: '/',
    });
    return c.json({ message: 'Logged in' });
};
// ========================
// Logout
// ========================
export const logoutHandler = (c) => {
    deleteCookie(c, 'token');
    return c.json({ message: 'Logged out' });
};
// ========================
// Middleware
// ========================
export const authMiddleware = async (c, next) => {
    const token = getCookie(c, 'token');
    if (!token) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
    try {
        const decoded = await verify(token, JWT_SECRET);
        c.set('user', decoded);
        await next();
    }
    catch {
        return c.json({ error: 'Invalid or expired token' }, 401);
    }
};
