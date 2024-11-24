import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import {sequelize} from './infrastructure/config/sequelizeConfig'

// entities import
import './domain/entities/user-entity';
import './domain/entities/account-entity';
import './domain/entities/asociation-entities';


import {UserRepository} from "./infrastructure/repositories/user-repository";
import {setupMiddlewareUserPublic} from "./presentation/setup-middleware/setup-middleware-user-public";
import {AccountRepository} from "./infrastructure/repositories/acccount-repository";

export const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({origin: '*'}));

const port = process.env.PORT || 4000;

const userDataStore = new UserRepository();
const accountDataStore = new AccountRepository();

const userPublicMiddleware = setupMiddlewareUserPublic(userDataStore, accountDataStore);


// routes
app.use("/api/public/user", userPublicMiddleware);


async function main() {
    try {
        await sequelize.sync({force: true});
        app.listen(port, () => {
            console.log('port ==> ', port);
        });
    } catch (error) {
        console.error(`Hubo un error al conectar a la base de datos: ${error}`);
    }
}

main().then();