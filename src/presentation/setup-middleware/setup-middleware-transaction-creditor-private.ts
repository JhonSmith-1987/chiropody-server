import {UserRepository} from "../../infrastructure/repositories/user-repository";
import {UserService} from "../../domain/services/user-service";
import {AccountRepository} from "../../infrastructure/repositories/acccount-repository";
import {AmountTotalRepository} from "../../infrastructure/repositories/amount-total-repository";
import {TransactionCreditorRepository} from "../../infrastructure/repositories/transaction-creditor-repository";
import {
    RegisterTransactionCreditorUseCase
} from "../../domain/use-cases/transaction-creditor/register-transaction-creditor-use-case";
import {TransactionCreditorService} from "../../domain/services/transaction-creditor-service";
import {AmountCreditorRepository} from "../../infrastructure/repositories/amount-creditor-repository";
import TransactionCreditorRouterPrivate from "../routes/transaction-creditor-router-private";

export function setupMiddlewareTransactionCreditorPrivate(
    userDataStore: UserRepository,
    accountDataStore: AccountRepository,
    amountTotalDataStore: AmountTotalRepository,
    transactionCreditorDataStore: TransactionCreditorRepository,
    amountCreditorDataStore: AmountCreditorRepository,
) {
    return TransactionCreditorRouterPrivate(
        new RegisterTransactionCreditorUseCase(new TransactionCreditorService(transactionCreditorDataStore, amountCreditorDataStore), new UserService(userDataStore, accountDataStore, amountTotalDataStore, )),
    );
}