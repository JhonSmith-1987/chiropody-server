import {IPaginateSearchService} from "../common/i-paginate-search-service";
import {IResponseAccountData} from "../models/account/i-response-account-data";
import {IResponseAllSearchAccounts} from "../models/account/i-response-all-search-accounts";

export interface IAccountService {
    allAccountPaginateAndSearch(paginate:IPaginateSearchService): Promise<IResponseAllSearchAccounts<IResponseAccountData[]>>;
}