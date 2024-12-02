import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import {sequelize} from './infrastructure/config/sequelizeConfig'

// entities import
import './domain/entities/user-entity';
import './domain/entities/account-entity';
import './domain/entities/client-entity';
import './domain/entities/provider-entity';
import './domain/entities/creditor-entity';
import './domain/entities/transaction-entity';
import './domain/entities/amoun-total-entity';
import './domain/entities/transaction-creditor-entity';
import './domain/entities/amoun-total-creditor-entity';
import './domain/entities/asociation-entities';


import {UserRepository} from "./infrastructure/repositories/user-repository";
import {setupMiddlewareUserPublic} from "./presentation/setup-middleware/setup-middleware-user-public";
import {AccountRepository} from "./infrastructure/repositories/acccount-repository";
import {setupMiddlewareAccountPrivate} from "./presentation/setup-middleware/setup-middleware-account-private";
import {setupMiddlewareAuthPrivate} from "./presentation/setup-middleware/setup-middleware-auth-private";
import {AmountTotalRepository} from "./infrastructure/repositories/amount-total-repository";
import {setupMiddlewareTransactionPrivate} from "./presentation/setup-middleware/setup-middleware-transaction-private";
import {TransactionRepository} from "./infrastructure/repositories/transaction-repository";
import {setupMiddlewareAmountTotalPrivate} from "./presentation/setup-middleware/setup-middleware-amount-total-private";
import {CreditorRepository} from "./infrastructure/repositories/creditor-repository";
import {AmountCreditorRepository} from "./infrastructure/repositories/amount-creditor-repository";
import {setupMiddlewareCreditorPrivate} from "./presentation/setup-middleware/setup-middleware-creditor-private";
import {TransactionCreditorRepository} from "./infrastructure/repositories/transaction-creditor-repository";
import {
    setupMiddlewareTransactionCreditorPrivate
} from "./presentation/setup-middleware/setup-middleware-transaction-creditor-private";
import {
    setupMiddlewareAmountCreditorPrivate
} from "./presentation/setup-middleware/setup-middleware-amount-creditor-private";

export const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({origin: '*'}));

const port = process.env.PORT || 4000;

const userDataStore = new UserRepository();
const accountDataStore = new AccountRepository();
const amountTotalDataStore = new AmountTotalRepository();
const transactionDataStore = new TransactionRepository();
const creditorDataStore = new CreditorRepository();
const amountCreditorDataStore = new AmountCreditorRepository();
const transactionCreditorDataStore = new TransactionCreditorRepository();


// middleware public
const userPublicMiddleware = setupMiddlewareUserPublic(userDataStore, accountDataStore, amountTotalDataStore);


// middleware private
const authPrivateMiddleware = setupMiddlewareAuthPrivate(userDataStore, accountDataStore, amountTotalDataStore);
const accountPrivateMiddleware = setupMiddlewareAccountPrivate(userDataStore, accountDataStore, amountTotalDataStore);
const transactionPrivateMiddleware = setupMiddlewareTransactionPrivate(userDataStore, accountDataStore, amountTotalDataStore, transactionDataStore);
const amountTotalPrivateMiddleware = setupMiddlewareAmountTotalPrivate(userDataStore, accountDataStore, amountTotalDataStore);
const creditorPrivateMiddleware = setupMiddlewareCreditorPrivate(userDataStore, accountDataStore, amountTotalDataStore, creditorDataStore, amountCreditorDataStore);
const transactionCreditorPrivateMiddleware = setupMiddlewareTransactionCreditorPrivate(userDataStore, accountDataStore, amountTotalDataStore, transactionCreditorDataStore, amountCreditorDataStore);
const amountCreditorPrivateMiddleware = setupMiddlewareAmountCreditorPrivate(userDataStore, accountDataStore, amountTotalDataStore, amountCreditorDataStore);


// routes public
app.use("/api/public/user", userPublicMiddleware);

// routes private
app.use("/api/private/auth", authPrivateMiddleware);
app.use("/api/private/account", accountPrivateMiddleware);
app.use("/api/private/transaction", transactionPrivateMiddleware);
app.use("/api/private/amount_total", amountTotalPrivateMiddleware);
app.use("/api/private/creditor", creditorPrivateMiddleware);
app.use("/api/private/transaction_creditor", transactionCreditorPrivateMiddleware);
app.use("/api/private/amount_creditor", amountCreditorPrivateMiddleware);


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