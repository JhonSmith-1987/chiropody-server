import {IResponseAccountData} from "../../models/account/i-response-account-data";
import {IUserDataToken} from "../../models/user/i-user-data-token";
import {IUpdateStatusAccount} from "../../models/account/i-update-status-account";
import {IResponseServerWithData} from "../../common/i-response-server-with-data";

export interface IUpdateStatusAccountUseCase {
    execute(data:IUpdateStatusAccount, userActive:IUserDataToken): Promise<IResponseServerWithData<IResponseAccountData | null>>;
}