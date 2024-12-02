import {IPaginateSearchService} from "../../common/i-paginate-search-service";
import {IResponseAllPaginateSearch} from "../../models/account/i-response-all-paginate-search";
import {IResponseAccountData} from "../../models/account/i-response-account-data";
import {IUserDataToken} from "../../models/user/i-user-data-token";

export interface IAllSearchAccountsUseCase {
    execute(paginate:IPaginateSearchService, userActive:IUserDataToken): Promise<IResponseAllPaginateSearch<IResponseAccountData[]>>;
}