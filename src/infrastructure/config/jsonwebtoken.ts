import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {IResponseUserRegister} from "../../domain/interfaces/models/user-model";

dotenv.config();

const secret = process.env.JWT_SECRET || 'segundaclavepary';
const timeExpires = process.env.JWT_EXPIRES_IN || '43200s';

const secretResetPassword = process.env.JWT_SECRET_RESET_PASSWORD || 'claveresetpasswordpary';
const timeExpiresResetPassword = process.env.JWT_EXPIRES_IN_RESET_PASSWORD || '200s';

// generar token para el auth
export function generateTokenAuth(payload: IResponseUserRegister): string {
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

// generar token para el reset password
export function generateTokenResetPassword(payload: IResponseUserRegister): string {
    return jwt.sign(payload, secretResetPassword, {
        expiresIn: timeExpiresResetPassword,
    });
}
export function verifyTokenResetPassword(token: string): string | jwt.JwtPayload | null {
    try {
        return jwt.verify(token, secretResetPassword);
    } catch (error) {
        return null
    }
}

