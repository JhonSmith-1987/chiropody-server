import {UserRepository} from "../../infrastructure/repositories/user-repository";
import UserRouterPublic from "../routes/user-router-public";
import {GetAllUsersUseCase} from "../../domain/use-cases/user/get-all-users-use-case";
import {UserService} from "../../domain/services/user-service";
import {AccountRepository} from "../../infrastructure/repositories/acccount-repository";
import {RegisterUserUseCase} from "../../domain/use-cases/user/register-user-use-case";
import {LoginUserUseCase} from "../../domain/use-cases/user/login-user-use-case";
import {AmountTotalRepository} from "../../infrastructure/repositories/amount-total-repository";

export function setupMiddlewareUserPublic(userDataStore: UserRepository, accountDataStore: AccountRepository, amountTotalDataStore: AmountTotalRepository) {
    return UserRouterPublic(
        new GetAllUsersUseCase(new UserService(userDataStore, accountDataStore, amountTotalDataStore)),
        new RegisterUserUseCase(new UserService(userDataStore, accountDataStore, amountTotalDataStore)),
        new LoginUserUseCase(new UserService(userDataStore, accountDataStore, amountTotalDataStore)),
    );
}