import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from "jsonwebtoken";
import {verifyTokenAuth} from "../../infrastructure/config/jsonwebtoken";

export interface CustomRequest extends Request {
    user?: JwtPayload | string;
}

class Middleware {

    constructor() {
    }

    async middlewareAdmin(req: CustomRequest, res: Response, next: NextFunction) {
        const tokenHeader = req.headers['authorization'];
        if (!tokenHeader) {
            res.status(200).json({
                status: 401,
                message: 'Falta el encabezado de autorización'
            });
            return;
        }
        const token = tokenHeader.split(' ')[1];
        try {
            const decoded = verifyTokenAuth(token);
            if (!decoded || (typeof decoded === 'string')) {
                res.status(200).json({
                    status: 403,
                    message: 'No tiene permisos'
                });
                return;
            }
            req.user = decoded;
            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                res.status(401).json({ message: 'El token ha expirado' });
            } else {
                res.status(403).json({ message: 'Token inválido' });
            }
            return;
        }
    }

}

export default Middleware;