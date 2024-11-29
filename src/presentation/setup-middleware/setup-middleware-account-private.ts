import {UserRepository} from "../../infrastructure/repositories/user-repository";
import {UserService} from "../../domain/services/user-service";
import {AccountRepository} from "../../infrastructure/repositories/acccount-repository";
import AccountRouterPrivate from "../routes/account-router-private";
import {AllSearchAccountsUseCase} from "../../domain/use-cases/account/all-search-accounts-use-case";
import {AccountService} from "../../domain/services/account-service";
import {UpdateStatusAccountUseCase} from "../../domain/use-cases/account/update-status-account-use-case";
import {AmountTotalRepository} from "../../infrastructure/repositories/amount-total-repository";

export function setupMiddlewareAccountPrivate(
    userDataStore: UserRepository,
    accountDataStore: AccountRepository,
    amountTotalDataStore: AmountTotalRepository,
) {
    return AccountRouterPrivate(
        new AllSearchAccountsUseCase(new UserService(userDataStore, accountDataStore, amountTotalDataStore), new AccountService(accountDataStore)),
        new UpdateStatusAccountUseCase(new UserService(userDataStore, accountDataStore, amountTotalDataStore), new AccountService(accountDataStore)),
    );
}