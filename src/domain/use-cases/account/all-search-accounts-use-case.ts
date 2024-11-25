import {IUserService} from "../../interfaces/services/i-user-service";
import {IAllSearchAccountsUseCase} from "../../interfaces/use-case/account/i-all-search-accounts-use-case";
import {IAccountService} from "../../interfaces/services/i-account-service";
import {IPaginateSearchService} from "../../interfaces/common/i-paginate-search-service";
import {IUserDataToken} from "../../interfaces/models/user/i-user-data-token";
import {IResponseAllSearchAccounts} from "../../interfaces/models/account/i-response-all-search-accounts";
import {IResponseAccountData} from "../../interfaces/models/account/i-response-account-data";

export class AllSearchAccountsUseCase implements IAllSearchAccountsUseCase {

    private userService: IUserService;
    private accountService: IAccountService;

    constructor(
        userService: IUserService,
        accountService: IAccountService,
    ) {
        this.userService = userService;
        this.accountService = accountService;
    }

    async execute(paginate:IPaginateSearchService, userActive:IUserDataToken): Promise<IResponseAllSearchAccounts<IResponseAccountData[]>> {
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
            return await this.accountService.allAccountPaginateAndSearch(paginate);
        } catch (error) {
            throw error;
        }
    }
}