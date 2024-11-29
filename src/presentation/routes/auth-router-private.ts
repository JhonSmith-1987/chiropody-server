import express from "express";
import { Response } from 'express';
import Middleware, {CustomRequest} from "../middlewares/middleware";
import {IUserDataToken} from "../../domain/interfaces/models/user/i-user-data-token";
import {IValidateSessionUseCase} from "../../domain/interfaces/use-case/auth-session/i-validate-session-use-case";

const middleware = new Middleware();

export default function AuthRouterPrivate(
    validateSessionUseCase: IValidateSessionUseCase,
) {
    const router = express.Router();

    router.get("/validate_session", middleware.middlewareAdmin, async (req: CustomRequest, res: Response) => {
        try {
            const userActive = req.user as IUserDataToken;
            const response = await validateSessionUseCase.execute(userActive);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal server error',
                data: null,
            });
        }
    });

    return router;
}