import {ICreateTransactionService} from "../../models/transaction/i-create-transaction-service";
import {IUserDataToken} from "../../models/user/i-user-data-token";
import {IResponseServerWithData} from "../../common/i-response-server-with-data";
import {TransactionAttributes} from "../../../entities/transaction-entity";

export interface IRegisterTransactionUseCase {
    execute(data: ICreateTransactionService, userActive:IUserDataToken): Promise<IResponseServerWithData<TransactionAttributes|null>>;
}