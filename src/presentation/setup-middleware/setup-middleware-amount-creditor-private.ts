import {UserRepository} from "../../infrastructure/repositories/user-repository";
import {UserService} from "../../domain/services/user-service";
import {AccountRepository} from "../../infrastructure/repositories/acccount-repository";
import {AmountTotalRepository} from "../../infrastructure/repositories/amount-total-repository";
import AmountCreditorRouterPrivate from "../routes/amount-creditor-router-private";
import {AmountCreditorUserUseCase} from "../../domain/use-cases/amount-creditor/amount-creditor-user-use-case";
import {AmountCreditorRepository} from "../../infrastructure/repositories/amount-creditor-repository";
import {AmountCreditorService} from "../../domain/services/amount-creditor-service";

export function setupMiddlewareAmountCreditorPrivate(
    userDataStore: UserRepository,
    accountDataStore: AccountRepository,
    amountTotalDataStore: AmountTotalRepository,
    amountCreditorDataStore: AmountCreditorRepository,
) {
    return AmountCreditorRouterPrivate(
        new AmountCreditorUserUseCase(new AmountCreditorService(amountCreditorDataStore), new UserService(userDataStore, accountDataStore, amountTotalDataStore)),
    );
}