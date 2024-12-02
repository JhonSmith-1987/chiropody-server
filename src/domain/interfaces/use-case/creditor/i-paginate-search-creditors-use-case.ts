import {IPaginateSearchService} from "../../common/i-paginate-search-service";
import {IResponseAllPaginateSearch} from "../../models/account/i-response-all-paginate-search";
import {IUserDataToken} from "../../models/user/i-user-data-token";
import {IResponseCreditorData} from "../../models/creditor/i-response-creditor-data";

export interface IPaginateSearchCreditorsUseCase {
    execute(paginate:IPaginateSearchService, userActive:IUserDataToken): Promise<IResponseAllPaginateSearch<IResponseCreditorData[]>>;
}