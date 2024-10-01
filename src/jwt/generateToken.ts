import { JWTPayload, SignJWT } from 'jose';

interface TokenData {
  cpf?: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
}

export const generateToken = async (tokenData: TokenData) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);

  console.log("secret", secret, tokenData, tokenData as JWTPayload);

  const token = await new SignJWT(tokenData as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  console.log("token", token);

  return { token };
};