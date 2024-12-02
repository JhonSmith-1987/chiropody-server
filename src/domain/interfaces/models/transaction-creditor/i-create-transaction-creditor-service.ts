import {TransactionCreditorAttributes} from "../../../entities/transaction-creditor-entity";

export interface ICreateTransactionCreditorService extends Pick<TransactionCreditorAttributes, 'creditor_id'|'status'|'type'|'amount'|'description'> {}