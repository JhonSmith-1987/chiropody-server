import express from "express";
import { Response } from 'express';
import Middleware, {CustomRequest} from "../middlewares/middleware";
import {IUserDataToken} from "../../domain/interfaces/models/user/i-user-data-token";
import {
    IRegisterTransactionUseCase
} from "../../domain/interfaces/use-case/transaction/i-register-transaction-use-case";

const middleware = new Middleware();

export default function TransactionRouterPrivate(
    registerTransactionUseCase: IRegisterTransactionUseCase,
) {
    const router = express.Router();

    router.post("/register_transaction", middleware.middlewareAdmin, async (req: CustomRequest, res: Response) => {
        try {
            const userActive = req.user as IUserDataToken;
            const response = await registerTransactionUseCase.execute(req.body, userActive);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal server error',
                data: null
            });
        }
    });

    return router;
}