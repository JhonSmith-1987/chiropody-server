import express from "express";
import { Response } from 'express';
import Middleware, {CustomRequest} from "../middlewares/middleware";
import {IUserDataToken} from "../../domain/interfaces/models/user/i-user-data-token";
import {
    IRegisterTransactionCreditorUseCase
} from "../../domain/interfaces/use-case/transaction-creditor/i-register-transaction-creditor-use-case";

const middleware = new Middleware();

export default function TransactionCreditorRouterPrivate(
    registerTransactionCreditorUseCase: IRegisterTransactionCreditorUseCase,
) {
    const router = express.Router();

    router.post("/register_transaction_creditor", middleware.middlewareAdmin, async (req: CustomRequest, res: Response) => {
        try {
            const userActive = req.user as IUserDataToken;
            const response = await registerTransactionCreditorUseCase.execute(req.body, userActive);
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