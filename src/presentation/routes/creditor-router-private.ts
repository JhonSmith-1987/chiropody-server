import express from "express";
import { Response } from 'express';
import Middleware, {CustomRequest} from "../middlewares/middleware";
import {IUserDataToken} from "../../domain/interfaces/models/user/i-user-data-token";
import {ICreateCreditorUseCase} from "../../domain/interfaces/use-case/creditor/i-create-creditor-use-case";
import {
    IPaginateSearchCreditorsUseCase
} from "../../domain/interfaces/use-case/creditor/i-paginate-search-creditors-use-case";
import {ICreditorByIdUseCase} from "../../domain/interfaces/use-case/creditor/i-creditor-by-id-use-case";
import {ICreditorId} from "../../domain/interfaces/models/creditor/i-creditor-id";
import {IUpdateCreditorUseCase} from "../../domain/interfaces/use-case/creditor/i-update-creditor-use-case";

const middleware = new Middleware();

export default function CreditorRouterPrivate(
    createCreditorUseCase: ICreateCreditorUseCase,
    paginateSearchCreditorsUseCase: IPaginateSearchCreditorsUseCase,
    creditorByIdUseCase: ICreditorByIdUseCase,
    updateCreditorUseCase: IUpdateCreditorUseCase,
) {
    const router = express.Router();

    router.post("/create", middleware.middlewareAdmin, async (req: CustomRequest, res: Response) => {
        try {
            const userActive = req.user as IUserDataToken;
            const response = await createCreditorUseCase.execute(req.body, userActive);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal server error',
                data: null
            });
        }
    });

    router.post("/paginate_search", middleware.middlewareAdmin, async (req: CustomRequest, res: Response) => {
        try {
            const userActive = req.user as IUserDataToken;
            const response = await paginateSearchCreditorsUseCase.execute(req.body, userActive);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal server error',
                data: null
            });
        }
    });

    router.get("/by_id", middleware.middlewareAdmin, async (req: CustomRequest, res: Response) => {
        try {
            const userActive = req.user as IUserDataToken;
            const query = req.query as unknown as ICreditorId;
            const response = await creditorByIdUseCase.execute(query, userActive);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal server error',
                data: null
            });
        }
    });

    router.put("/update", middleware.middlewareAdmin, async (req: CustomRequest, res: Response) => {
        try {
            const userActive = req.user as IUserDataToken;
            const query = req.query as unknown as ICreditorId;
            const response = await updateCreditorUseCase.execute(req.body ,query, userActive);
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