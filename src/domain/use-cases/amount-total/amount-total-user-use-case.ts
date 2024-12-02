import {IUserService} from "../../interfaces/services/i-user-service";
import {IUserDataToken} from "../../interfaces/models/user/i-user-data-token";
import {IResponseServerWithData} from "../../interfaces/common/i-response-server-with-data";
import {IAmountTotalUserUseCase} from "../../interfaces/use-case/amount-total/i-amount-total-user-use-case";
import {IAmountTotalService} from "../../interfaces/services/i-amount-total-service";

export class AmountTotalUserUseCase implements IAmountTotalUserUseCase {

    private amountTotalService: IAmountTotalService;
    private userService: IUserService;

    constructor(
        amountTotalService: IAmountTotalService,
        userService: IUserService,
    ) {
        this.amountTotalService = amountTotalService;
        this.userService = userService;
    }

    async execute(userActive: IUserDataToken): Promise<IResponseServerWithData<number>> {
        try {
            const validate = await this.userService.validateUserAdminActive(userActive);
            if (validate.status !== 200) {
                return {
                    status: validate.status,
                    message: validate.message,
                    data: 0
                }
            }
            return await this.amountTotalService.totalAmountOfUser(userActive.user.id, userActive.account.id);
        } catch (error) {
            throw error;
        }
    }
}