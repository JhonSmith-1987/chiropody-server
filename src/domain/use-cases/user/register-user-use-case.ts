import {IUserService} from "../../interfaces/services/i-user-service";
import {IRegisterUsersUseCase} from "../../interfaces/use-case/user/i-register-users-use-case";
import {IRequestCreateUser} from "../../interfaces/models/user/i-request-create-user";
import {IResponseServerDefault} from "../../interfaces/common/i-response-server-default";

export class RegisterUserUseCase implements IRegisterUsersUseCase {

    private userService: IUserService;

    constructor(
        userService: IUserService,
    ) {
        this.userService = userService;
    }

    async execute(user: IRequestCreateUser): Promise<IResponseServerDefault> {
        try {
            return this.userService.create(user);
        } catch (error) {
            throw error;
        }
    }
}