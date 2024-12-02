import {getCurrentTimestampToSeconds} from "./generate-date-functions";
import {
    ICreateTransactionCreditorService
} from "../domain/interfaces/models/transaction-creditor/i-create-transaction-creditor-service";
import {TransactionCreditorCreationAttributes} from "../domain/entities/transaction-creditor-entity";

export function generateCreateTransactionCreditor(data: ICreateTransactionCreditorService, user_id: string, account_id: string): TransactionCreditorCreationAttributes {
    return {
        date: getCurrentTimestampToSeconds(),
        creditor_id: data.creditor_id,
        amount: data.amount,
        type: data.type,
        status: data.status,
        user_id: user_id,
        description: data.description,
        account_id: account_id
    }
}