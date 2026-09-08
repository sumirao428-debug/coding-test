import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

if (!SECRET) throw new Error('JWT_SECRET is not defined in environment variables')

export interface AdminTokenPayload {
  email: string
  iat?: number
  exp?: number
}

export function signAdminToken(payload: { email: string }) {
  return jwt.sign(payload, SECRET!, { expiresIn: '7d' })
}

export function verifyAdminToken(token: string): AdminTokenPayload {
  return jwt.verify(token, SECRET!) as AdminTokenPayload
}
