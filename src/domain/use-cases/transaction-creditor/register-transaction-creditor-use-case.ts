import {IUserService} from "../../interfaces/services/i-user-service";
import {IUserDataToken} from "../../interfaces/models/user/i-user-data-token";
import {IResponseServerWithData} from "../../interfaces/common/i-response-server-with-data";
import {
    IRegisterTransactionCreditorUseCase
} from "../../interfaces/use-case/transaction-creditor/i-register-transaction-creditor-use-case";
import {ITransactionCreditorService} from "../../interfaces/services/i-transaction-creditor-service";
import {
    ICreateTransactionCreditorService
} from "../../interfaces/models/transaction-creditor/i-create-transaction-creditor-service";
import TransactionCreditorEntity from "../../entities/transaction-creditor-entity";

export class RegisterTransactionCreditorUseCase implements IRegisterTransactionCreditorUseCase {

    private transactionCreditorService: ITransactionCreditorService;
    private userService: IUserService;

    constructor(
        transactionCreditorService: ITransactionCreditorService,
        userService: IUserService,
    ) {
        this.transactionCreditorService = transactionCreditorService;
        this.userService = userService;
    }

    async execute(data: ICreateTransactionCreditorService, userActive: IUserDataToken): Promise<IResponseServerWithData<TransactionCreditorEntity | null>> {
        try {
            const validate = await this.userService.validateUserAdminActive(userActive);
            if (validate.status !== 200) {
                return {
                    status: validate.status,
                    message: validate.message,
                    data: null
                }
            }
            return await this.transactionCreditorService.create(data, userActive.user.id, userActive.account.id);
        } catch (error) {
            throw error;
        }
    }
}