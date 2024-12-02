import {IPaginateSearchService} from "../common/i-paginate-search-service";
import {IResponseAccountData} from "../models/account/i-response-account-data";
import {IResponseAllPaginateSearch} from "../models/account/i-response-all-paginate-search";
import {IUpdateAccountService} from "../models/account/i-update-account-service";
import {IResponseServerWithData} from "../common/i-response-server-with-data";

export interface IAccountService {
    allAccountPaginateAndSearch(paginate:IPaginateSearchService): Promise<IResponseAllPaginateSearch<IResponseAccountData[]>>;
    updateAccount(data:IUpdateAccountService, id: string): Promise<IResponseServerWithData<IResponseAccountData|null>>;
}