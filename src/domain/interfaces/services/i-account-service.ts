import {IPaginateSearchService} from "../common/i-paginate-search-service";
import {IResponseAccountData} from "../models/account/i-response-account-data";
import {IResponseAllSearchAccounts} from "../models/account/i-response-all-search-accounts";
import {IUpdateAccountService} from "../models/account/i-update-account-service";
import {IResponseServerWithData} from "../common/i-response-server-with-data";

export interface IAccountService {
    allAccountPaginateAndSearch(paginate:IPaginateSearchService): Promise<IResponseAllSearchAccounts<IResponseAccountData[]>>;
    updateAccount(data:IUpdateAccountService, id: string): Promise<IResponseServerWithData<IResponseAccountData|null>>;
}