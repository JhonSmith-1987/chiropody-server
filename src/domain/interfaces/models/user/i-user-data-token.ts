import {IResponseUserData} from "./i-response-user-data";
import {IResponseAccountData} from "../account/i-response-account-data";

export interface IUserDataToken {
    user: IResponseUserData,
    account: IResponseAccountData,
}