import {IUserDataToken} from "../../models/user/i-user-data-token";
import {IResponseServerWithData} from "../../common/i-response-server-with-data";
import {
    ICreateTransactionCreditorService
} from "../../models/transaction-creditor/i-create-transaction-creditor-service";
import TransactionCreditorEntity from "../../../entities/transaction-creditor-entity";

export interface IRegisterTransactionCreditorUseCase {
    execute(data: ICreateTransactionCreditorService, userActive:IUserDataToken): Promise<IResponseServerWithData<TransactionCreditorEntity|null>>;
}