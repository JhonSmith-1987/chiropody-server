import express from "express";
import { Response } from 'express';
import Middleware, {CustomRequest} from "../middlewares/middleware";
import {IUserDataToken} from "../../domain/interfaces/models/user/i-user-data-token";
import {
    IAmountCreditorUserUseCase
} from "../../domain/interfaces/use-case/amount-creditor/i-amount-creditor-user-use-case";
import {ICreditorId} from "../../domain/interfaces/models/creditor/i-creditor-id";

const middleware = new Middleware();

export default function AmountCreditorRouterPrivate(
    amountCreditorUserUseCase: IAmountCreditorUserUseCase,
) {
    const router = express.Router();

    router.get("/user_active", middleware.middlewareAdmin, async (req: CustomRequest, res: Response) => {
        try {
            const userActive = req.user as IUserDataToken;
            const query = req.query as unknown as ICreditorId;
            const response = await amountCreditorUserUseCase.execute(query, userActive);
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