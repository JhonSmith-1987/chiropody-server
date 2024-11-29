import {ICreateTransactionService} from "../models/transaction/i-create-transaction-service";
import {IResponseServerWithData} from "../common/i-response-server-with-data";
import {TransactionAttributes} from "../../entities/transaction-entity";


export interface ITransactionService {
    create(data: ICreateTransactionService, user_id: string, account_id: string): Promise<IResponseServerWithData<TransactionAttributes|null>>;
}