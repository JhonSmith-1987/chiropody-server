import {IValidateSessionUseCase} from "../../interfaces/use-case/auth-session/i-validate-session-use-case";
import {IUserService} from "../../interfaces/services/i-user-service";
import {IUserDataToken} from "../../interfaces/models/user/i-user-data-token";
import {IResponseServerWithData} from "../../interfaces/common/i-response-server-with-data";

export class ValidateSessionUseCase implements IValidateSessionUseCase {

    private userService: IUserService;

    constructor(
        userService: IUserService,
    ) {
        this.userService = userService;
    }

    async execute(userActive: IUserDataToken): Promise<IResponseServerWithData<IUserDataToken | null>> {
        try {
            const validate_session = await this.userService.validateUserAdminActive(userActive);
            if (validate_session.status !== 200) {
                return {
                    status: validate_session.status,
                    message: validate_session.message,
                    data: null,
                }
            }
            return {
                status: 200,
                message: 'Sesión activa',
                data: userActive
            }
        } catch (error) {
            throw error;
        }
    }
}