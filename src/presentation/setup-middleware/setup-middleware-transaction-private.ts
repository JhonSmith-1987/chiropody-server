import {UserRepository} from "../../infrastructure/repositories/user-repository";
import {UserService} from "../../domain/services/user-service";
import {AccountRepository} from "../../infrastructure/repositories/acccount-repository";
import {AmountTotalRepository} from "../../infrastructure/repositories/amount-total-repository";
import TransactionRouterPrivate from "../routes/transaction-router-private";
import {RegisterTransactionUseCase} from "../../domain/use-cases/transaction/register-transaction-use-case";
import {TransactionService} from "../../domain/services/transaction-service";
import {TransactionRepository} from "../../infrastructure/repositories/transaction-repository";

export function setupMiddlewareTransactionPrivate(
    userDataStore: UserRepository,
    accountDataStore: AccountRepository,
    amountTotalDataStore: AmountTotalRepository,
    transactionDataStore: TransactionRepository,
) {
    return TransactionRouterPrivate(
        new RegisterTransactionUseCase(new TransactionService(transactionDataStore, amountTotalDataStore), new UserService(userDataStore, accountDataStore, amountTotalDataStore)),
    );
}