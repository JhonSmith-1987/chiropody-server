import express from "express";
import { Response } from 'express';
import Middleware, {CustomRequest} from "../middlewares/middleware";
import {IUserDataToken} from "../../domain/interfaces/models/user/i-user-data-token";
import {IAmountTotalUserUseCase} from "../../domain/interfaces/use-case/amount-total/i-amount-total-user-use-case";

const middleware = new Middleware();

export default function AmountTotalRouterPrivate(
    amountTotalUserUseCase: IAmountTotalUserUseCase,
) {
    const router = express.Router();

    router.get("/user_active", middleware.middlewareAdmin, async (req: CustomRequest, res: Response) => {
        try {
            const userActive = req.user as IUserDataToken;
            const response = await amountTotalUserUseCase.execute(userActive);
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