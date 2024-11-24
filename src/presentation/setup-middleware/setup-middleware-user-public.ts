import {UserRepository} from "../../infrastructure/repositories/user-repository";
import UserRouterPublic from "../routes/user-router-public";
import {GetAllUsersUseCase} from "../../domain/use-cases/user/get-all-users-use-case";
import {UserService} from "../../domain/services/user-service";

export function setupMiddlewareUserPublic(userDataStore: UserRepository) {
    return UserRouterPublic(
        new GetAllUsersUseCase(new UserService(userDataStore)),
    );
}