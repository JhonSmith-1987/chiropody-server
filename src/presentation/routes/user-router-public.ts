import {IGetAllUsersUseCase} from "../../domain/interfaces/use-case/user/i-get-all-users-use-case";
import express from "express";
import { Request, Response } from 'express';
import {IPaginateService} from "../../domain/interfaces/common/i-paginate-service";

export default function UserRouterPublic(
    getAllUsersUseCase: IGetAllUsersUseCase,
) {
    const router = express.Router();

    router.get("/all_users", async (req: Request, res: Response) => {
        try {
            const query = req.query as unknown as IPaginateService;
            const response = await getAllUsersUseCase.execute(query);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal server error',
                data: error
            });
        }
    });


    return router;
}