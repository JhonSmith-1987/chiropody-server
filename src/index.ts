import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import {sequelize} from './infrastructure/config/sequelizeConfig'

// entities import


export const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({origin: '*'}));

const port = process.env.PORT || 4000;




// routes


async function main() {
    try {
        await sequelize.sync({force: false});
        app.listen(port, () => {
            console.log('port ==> ', port);
        });
    } catch (error) {
        console.error(`Hubo un error al conectar a la base de datos: ${error}`);
    }
}

main().then();