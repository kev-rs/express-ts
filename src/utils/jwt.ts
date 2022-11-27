import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET ?? 'secret123'

export type PayloadType = {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'admin';
}

const generateToken = async (payload: PayloadType) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h', mutatePayload: false })
  return token;
}

const verify = async (token: string): Promise<string | jwt.JwtPayload>  => {
  const verifyToken = jwt.verify(token, JWT_SECRET);
  return verifyToken
}

export { generateToken, verify };