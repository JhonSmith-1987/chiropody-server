import {UserRepository} from "../../infrastructure/repositories/user-repository";
import {UserService} from "../../domain/services/user-service";
import {AccountRepository} from "../../infrastructure/repositories/acccount-repository";
import {AmountTotalRepository} from "../../infrastructure/repositories/amount-total-repository";
import AmountTotalRouterPrivate from "../routes/amount-total-router-private";
import {AmountTotalUserUseCase} from "../../domain/use-cases/amount-total/amount-total-user-use-case";
import {AmountTotalService} from "../../domain/services/amount-total-service";

export function setupMiddlewareAmountTotalPrivate(
    userDataStore: UserRepository,
    accountDataStore: AccountRepository,
    amountTotalDataStore: AmountTotalRepository,
) {
    return AmountTotalRouterPrivate(
        new AmountTotalUserUseCase(new AmountTotalService(amountTotalDataStore), new UserService(userDataStore, accountDataStore, amountTotalDataStore)),
    );
}