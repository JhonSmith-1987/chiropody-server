import {IResponseServerWithData} from "../common/i-response-server-with-data";
import {ICreateTransactionCreditorService} from "../models/transaction-creditor/i-create-transaction-creditor-service";
import TransactionCreditorEntity from "../../entities/transaction-creditor-entity";


export interface ITransactionCreditorService {
    create(data: ICreateTransactionCreditorService, user_id: string, account_id: string): Promise<IResponseServerWithData<TransactionCreditorEntity|null>>;
}