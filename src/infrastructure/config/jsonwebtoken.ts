import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'segundaclavepary';
const timeExpires = process.env.JWT_EXPIRES_IN || '43200s';

// generar token para el auth
export function generateTokenAuth(payload: any): string {
    return jwt.sign(payload, secret, {
        expiresIn: timeExpires,
    });
}
export function verifyTokenAuth(token: string): string | jwt.JwtPayload | null {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null
    }
}

