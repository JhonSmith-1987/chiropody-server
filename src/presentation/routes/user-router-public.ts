import {IGetAllUsersUseCase} from "../../domain/interfaces/use-case/user/i-get-all-users-use-case";
import express from "express";
import { Request, Response } from 'express';
import {IPaginateService} from "../../domain/interfaces/common/i-paginate-service";
import {IRegisterUsersUseCase} from "../../domain/interfaces/use-case/user/i-register-users-use-case";
import {ILoginUserUseCase} from "../../domain/interfaces/use-case/user/i-login-user-use-case";

export default function UserRouterPublic(
    getAllUsersUseCase: IGetAllUsersUseCase,
    registerUsersUseCase: IRegisterUsersUseCase,
    loginUserUseCase: ILoginUserUseCase,
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

    router.post("/register", async (req: Request, res: Response) => {
        try {
            const response = await registerUsersUseCase.execute(req.body);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal server error',
                data: error
            });
        }
    });

    router.post("/login", async (req: Request, res: Response) => {
        try {
            const response = await loginUserUseCase.execute(req.body);
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