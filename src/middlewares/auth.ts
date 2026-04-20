import { Context, Next } from 'hono'
import { sign, verify } from 'hono/jwt'

// ⚠️ MUST be in your .env
const JWT_SECRET = process.env.bearerAuthToken!
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined')
}

// ========================
// Generate JWT
// ========================
export const generateToken = async (payload: {
  id: string
  username: string
}) => {
  return await sign(
    {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 1 day
    },
    JWT_SECRET
  )
}

// ========================
// Middleware (Protect Routes)
// ========================
export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = await verify(token, JWT_SECRET)

    // attach user to context
    c.set('user', decoded)

    await next()
  } catch (err) {
    return c.json({ error: 'Invalid or expired token' }, 401)
  }
}

// ========================
// Get current user helper
// ========================
export const getUser = (c: Context) => {
  return c.get('user')
}