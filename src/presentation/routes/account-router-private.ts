import express from "express";
import { Response } from 'express';
import {IAllSearchAccountsUseCase} from "../../domain/interfaces/use-case/account/i-all-search-accounts-use-case";
import Middleware, {CustomRequest} from "../middlewares/middleware";
import {IUserDataToken} from "../../domain/interfaces/models/user/i-user-data-token";
import {IUpdateStatusAccountUseCase} from "../../domain/interfaces/use-case/account/i-update-status-account-use-case";

const middleware = new Middleware();

export default function AccountRouterPrivate(
    allSearchAccountsUseCase: IAllSearchAccountsUseCase,
    updateStatusAccountUseCase: IUpdateStatusAccountUseCase,
) {
    const router = express.Router();

    router.post("/all_search_accounts", middleware.middlewareAdmin, async (req: CustomRequest, res: Response) => {
        try {
            const userActive = req.user as IUserDataToken;
            const response = await allSearchAccountsUseCase.execute(req.body, userActive);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal server error',
                data: [],
                total_count: 0
            });
        }
    });

    router.put("/update_status", middleware.middlewareAdmin, async (req: CustomRequest, res: Response) => {
        try {
            const userActive = req.user as IUserDataToken;
            const response = await updateStatusAccountUseCase.execute(req.body, userActive);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal server error',
                data: [],
                total_count: 0
            });
        }
    });

    return router;
}