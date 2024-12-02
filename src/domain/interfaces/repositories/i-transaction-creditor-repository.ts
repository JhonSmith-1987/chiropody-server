import {IPaginateRepository} from "../common/i-paginate-repository";
import TransactionCreditorEntity, {TransactionCreditorCreationAttributes} from "../../entities/transaction-creditor-entity";


export interface ITransactionCreditorRepository {
   create(data: TransactionCreditorCreationAttributes): Promise<TransactionCreditorEntity>;
   getById(id: string): Promise<TransactionCreditorEntity|null>;
   getByUserAccountCreditorId(user_id: string, account_id: string, creditor_id: string): Promise<TransactionCreditorEntity|null>;
   getAllByUserAccountCreditorId(paginate: IPaginateRepository, user_id: string, account_id: string, creditor_id: string): Promise<TransactionCreditorEntity[]>;
   countByUserAccountId(user_id: string, account_id: string, creditor_id: string): Promise<number>;
}