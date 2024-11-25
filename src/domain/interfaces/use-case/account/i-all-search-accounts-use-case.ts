import {IPaginateSearchService} from "../../common/i-paginate-search-service";
import {IResponseAllSearchAccounts} from "../../models/account/i-response-all-search-accounts";
import {IResponseAccountData} from "../../models/account/i-response-account-data";
import {IUserDataToken} from "../../models/user/i-user-data-token";

export interface IAllSearchAccountsUseCase {
    execute(paginate:IPaginateSearchService, userActive:IUserDataToken): Promise<IResponseAllSearchAccounts<IResponseAccountData[]>>;
}