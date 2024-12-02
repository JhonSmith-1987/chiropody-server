import {IUserService} from "../../interfaces/services/i-user-service";
import {IUserDataToken} from "../../interfaces/models/user/i-user-data-token";
import {IResponseServerWithData} from "../../interfaces/common/i-response-server-with-data";
import {ICreditorService} from "../../interfaces/services/i-creditor-service";
import {ICreditorByIdUseCase} from "../../interfaces/use-case/creditor/i-creditor-by-id-use-case";
import {ICreditorId} from "../../interfaces/models/creditor/i-creditor-id";
import {IResponseCreditorData} from "../../interfaces/models/creditor/i-response-creditor-data";

export class CreditorByIdUseCase implements ICreditorByIdUseCase {

    private creditorService: ICreditorService;
    private userService: IUserService;

    constructor(
        creditorService: ICreditorService,
        userService: IUserService,
    ) {
        this.creditorService = creditorService;
        this.userService = userService;
    }

    async execute(data: ICreditorId, userActive:IUserDataToken): Promise<IResponseServerWithData<IResponseCreditorData | null>> {
        try {
            const validate = await this.userService.validateUserAdminActive(userActive);
            if (validate.status !== 200) {
                return {
                    status: validate.status,
                    message: validate.message,
                    data: null
                }
            }
            return await this.creditorService.creditorById(data, userActive);
        } catch (error) {
            throw error;
        }
    }
}