import {IUserService} from "../../interfaces/services/i-user-service";
import {IPaginateSearchService} from "../../interfaces/common/i-paginate-search-service";
import {IUserDataToken} from "../../interfaces/models/user/i-user-data-token";
import {IResponseAllPaginateSearch} from "../../interfaces/models/account/i-response-all-paginate-search";
import {IPaginateSearchCreditorsUseCase} from "../../interfaces/use-case/creditor/i-paginate-search-creditors-use-case";
import {ICreditorService} from "../../interfaces/services/i-creditor-service";
import {IResponseCreditorData} from "../../interfaces/models/creditor/i-response-creditor-data";

export class PaginateSearchCreditorsUseCase implements IPaginateSearchCreditorsUseCase {

    private userService: IUserService;
    private creditorService: ICreditorService;

    constructor(
        userService: IUserService,
        creditorService: ICreditorService,
    ) {
        this.userService = userService;
        this.creditorService = creditorService;
    }

    async execute(paginate:IPaginateSearchService, userActive:IUserDataToken): Promise<IResponseAllPaginateSearch<IResponseCreditorData[]>> {
        try {
            const validate = await this.userService.validateUserAdminActive(userActive);
            if (validate.status !== 200) {
                return {
                    status: validate.status,
                    message: validate.message,
                    data: [],
                    total_count: 0
                }
            }
            return await this.creditorService.allPaginateSearch(paginate, userActive.user.id, userActive.account.id);
        } catch (error) {
            throw error;
        }
    }
}