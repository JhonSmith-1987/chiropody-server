import {IUserService} from "../../interfaces/services/i-user-service";
import {IUserDataToken} from "../../interfaces/models/user/i-user-data-token";
import {IResponseServerWithData} from "../../interfaces/common/i-response-server-with-data";
import {ICreateCreditorUseCase} from "../../interfaces/use-case/creditor/i-create-creditor-use-case";
import {ICreateCreditorService} from "../../interfaces/models/creditor/i-create-creditor-service";
import {CreditorAttributes} from "../../entities/creditor-entity";
import {ICreditorService} from "../../interfaces/services/i-creditor-service";

export class CreateCreditorUseCase implements ICreateCreditorUseCase {

    private creditorService: ICreditorService;
    private userService: IUserService;

    constructor(
        creditorService: ICreditorService,
        userService: IUserService,
    ) {
        this.creditorService = creditorService;
        this.userService = userService;
    }

    async execute(data: ICreateCreditorService, userActive: IUserDataToken): Promise<IResponseServerWithData<CreditorAttributes | null>> {
        try {
            const validate = await this.userService.validateUserAdminActive(userActive);
            if (validate.status !== 200) {
                return {
                    status: validate.status,
                    message: validate.message,
                    data: null
                }
            }
            return await this.creditorService.create(data, userActive.user.id, userActive.account.id);
        } catch (error) {
            throw error;
        }
    }
}