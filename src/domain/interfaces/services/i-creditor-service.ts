import {IResponseServerWithData} from "../common/i-response-server-with-data";
import {ICreateCreditorService} from "../models/creditor/i-create-creditor-service";
import {CreditorAttributes} from "../../entities/creditor-entity";
import {IPaginateSearchService} from "../common/i-paginate-search-service";
import {IResponseAllPaginateSearch} from "../models/account/i-response-all-paginate-search";
import {IResponseCreditorData} from "../models/creditor/i-response-creditor-data";
import {ICreditorId} from "../models/creditor/i-creditor-id";
import {IUserDataToken} from "../models/user/i-user-data-token";
import {IUpdateCreditor} from "../models/creditor/i-update-creditor";


export interface ICreditorService {
    create(data: ICreateCreditorService, user_id: string, account_id: string): Promise<IResponseServerWithData<CreditorAttributes|null>>;
    allPaginateSearch(data: IPaginateSearchService, user_id: string, account_id: string): Promise<IResponseAllPaginateSearch<IResponseCreditorData[]>>;
    creditorById(data: ICreditorId, userActive:IUserDataToken): Promise<IResponseServerWithData<IResponseCreditorData|null>>;
    updateById(data: IUpdateCreditor, dataId: ICreditorId): Promise<IResponseServerWithData<IResponseCreditorData|null>>;
}