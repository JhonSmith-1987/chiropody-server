import {IResponseServerWithData} from "../common/i-response-server-with-data";


export interface IAmountTotalService {
    totalAmountOfUser(user_id: string, account_id: string): Promise<IResponseServerWithData<number>>;
}