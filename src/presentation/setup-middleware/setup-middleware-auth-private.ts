import {UserRepository} from "../../infrastructure/repositories/user-repository";
import {UserService} from "../../domain/services/user-service";
import {AccountRepository} from "../../infrastructure/repositories/acccount-repository";
import AuthRouterPrivate from "../routes/auth-router-private";
import {ValidateSessionUseCase} from "../../domain/use-cases/auth-session/validate-session-use-case";
import {AmountTotalRepository} from "../../infrastructure/repositories/amount-total-repository";

export function setupMiddlewareAuthPrivate(
    userDataStore: UserRepository,
    accountDataStore: AccountRepository,
    amountTotalDataStore: AmountTotalRepository,
) {
    return AuthRouterPrivate(
        new ValidateSessionUseCase(new UserService(userDataStore, accountDataStore, amountTotalDataStore)),
    );
}