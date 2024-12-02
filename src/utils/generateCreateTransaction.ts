import {ICreateTransactionService} from "../domain/interfaces/models/transaction/i-create-transaction-service";
import {TransactionCreationAttributes} from "../domain/entities/transaction-entity";
import {getCurrentTimestampToSeconds} from "./generate-date-functions";

export function generateCreateTransaction(data: ICreateTransactionService, user_id: string, account_id: string): TransactionCreationAttributes {
    return {
        date: getCurrentTimestampToSeconds(),
        transaction_id: data.transaction_id,
        amount: data.amount,
        transaction_data: data.transaction_data,
        account_id: account_id,
        type: data.type,
        status: data.status,
        user_id: user_id,
        description: data.description,
    }
}