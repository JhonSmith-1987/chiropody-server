import {IUserService} from "../../interfaces/services/i-user-service";
import {IUserDataToken} from "../../interfaces/models/user/i-user-data-token";
import {IResponseServerWithData} from "../../interfaces/common/i-response-server-with-data";
import {IAmountCreditorUserUseCase} from "../../interfaces/use-case/amount-creditor/i-amount-creditor-user-use-case";
import {IAmountCreditorService} from "../../interfaces/services/i-amount-creditor-service";
import {ICreditorId} from "../../interfaces/models/creditor/i-creditor-id";

export class AmountCreditorUserUseCase implements IAmountCreditorUserUseCase {

    private amountCreditorService: IAmountCreditorService;
    private userService: IUserService;

    constructor(
        amountCreditorService: IAmountCreditorService,
        userService: IUserService,
    ) {
        this.amountCreditorService = amountCreditorService;
        this.userService = userService;
    }

    async execute(query: ICreditorId, userActive: IUserDataToken): Promise<IResponseServerWithData<number>> {
        try {
            const validate = await this.userService.validateUserAdminActive(userActive);
            if (validate.status !== 200) {
                return {
                    status: validate.status,
                    message: validate.message,
                    data: 0
                }
            }
            return await this.amountCreditorService.totalAmountCreditorOfUser(userActive.user.id, userActive.account.id, query.id);
        } catch (error) {
            throw error;
        }
    }
}