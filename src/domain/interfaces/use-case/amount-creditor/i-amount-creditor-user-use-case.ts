import {IUserDataToken} from "../../models/user/i-user-data-token";
import {IResponseServerWithData} from "../../common/i-response-server-with-data";
import {ICreditorId} from "../../models/creditor/i-creditor-id";

export interface IAmountCreditorUserUseCase {
    execute(query: ICreditorId, userActive:IUserDataToken): Promise<IResponseServerWithData<number>>;
}