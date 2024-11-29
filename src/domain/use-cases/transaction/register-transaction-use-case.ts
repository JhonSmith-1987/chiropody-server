import {IRegisterTransactionUseCase} from "../../interfaces/use-case/transaction/i-register-transaction-use-case";
import {ITransactionService} from "../../interfaces/services/i-transaction-service";
import {IUserService} from "../../interfaces/services/i-user-service";
import {ICreateTransactionService} from "../../interfaces/models/transaction/i-create-transaction-service";
import {IUserDataToken} from "../../interfaces/models/user/i-user-data-token";
import {IResponseServerWithData} from "../../interfaces/common/i-response-server-with-data";
import {TransactionAttributes} from "../../entities/transaction-entity";

export class RegisterTransactionUseCase implements IRegisterTransactionUseCase {

    private transactionService: ITransactionService;
    private userService: IUserService;

    constructor(
        transactionService: ITransactionService,
        userService: IUserService,
    ) {
        this.transactionService = transactionService;
        this.userService = userService;
    }

    async execute(data: ICreateTransactionService, userActive: IUserDataToken): Promise<IResponseServerWithData<TransactionAttributes | null>> {
        try {
            const validate = await this.userService.validateUserAdminActive(userActive);
            if (validate.status !== 200) {
                return {
                    status: validate.status,
                    message: validate.message,
                    data: null
                }
            }
            return await this.transactionService.create(data, userActive.user.id, userActive.account.id);
        } catch (error) {
            throw error;
        }
    }
}