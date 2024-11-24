import {IUserService} from "../../interfaces/services/i-user-service";
import {ILoginUserUseCase} from "../../interfaces/use-case/user/i-login-user-use-case";
import {ILogin} from "../../interfaces/models/user/i-login";
import {IResponseLogin} from "../../interfaces/models/user/i-response-login";

export class LoginUserUseCase implements ILoginUserUseCase {

    private userService: IUserService;

    constructor(
        userService: IUserService,
    ) {
        this.userService = userService;
    }

    async execute(login: ILogin): Promise<IResponseLogin<string | null>> {
        try {
            return this.userService.login(login);
        } catch (error) {
            throw error;
        }
    }
}