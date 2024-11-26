import {IUserService} from "../../interfaces/services/i-user-service";
import {IAccountService} from "../../interfaces/services/i-account-service";
import {IUserDataToken} from "../../interfaces/models/user/i-user-data-token";
import {IResponseAccountData} from "../../interfaces/models/account/i-response-account-data";
import {IUpdateStatusAccountUseCase} from "../../interfaces/use-case/account/i-update-status-account-use-case";
import {IUpdateStatusAccount} from "../../interfaces/models/account/i-update-status-account";
import {IResponseServerWithData} from "../../interfaces/common/i-response-server-with-data";

export class UpdateStatusAccountUseCase implements IUpdateStatusAccountUseCase {

    private userService: IUserService;
    private accountService: IAccountService;

    constructor(
        userService: IUserService,
        accountService: IAccountService,
    ) {
        this.userService = userService;
        this.accountService = accountService;
    }

    async execute(data:IUpdateStatusAccount, userActive:IUserDataToken): Promise<IResponseServerWithData<IResponseAccountData | null>> {
        try {
            const validate = await this.userService.validateUserAdminActive(userActive);
            if (validate.status !== 200) {
                return {
                    status: validate.status,
                    message: validate.message,
                    data: null
                }
            }
            return await this.accountService.updateAccount({status: data.status}, data.account_id);
        } catch (error) {
            throw error;
        }
    }
}