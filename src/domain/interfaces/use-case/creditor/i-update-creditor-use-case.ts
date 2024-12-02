import {IUserDataToken} from "../../models/user/i-user-data-token";
import {IResponseServerWithData} from "../../common/i-response-server-with-data";
import {ICreditorId} from "../../models/creditor/i-creditor-id";
import {IResponseCreditorData} from "../../models/creditor/i-response-creditor-data";
import {IUpdateCreditor} from "../../models/creditor/i-update-creditor";

export interface IUpdateCreditorUseCase {
    execute(data: IUpdateCreditor, dataId: ICreditorId, userActive:IUserDataToken): Promise<IResponseServerWithData<IResponseCreditorData | null>>;
}