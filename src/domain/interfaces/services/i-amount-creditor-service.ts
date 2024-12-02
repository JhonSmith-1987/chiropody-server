import {IResponseServerWithData} from "../common/i-response-server-with-data";


export interface IAmountCreditorService {
    totalAmountCreditorOfUser(user_id: string, account_id: string, creditor_id: string): Promise<IResponseServerWithData<number>>;
}