import TransactionEntity, {TransactionCreationAttributes} from "../../entities/transaction-entity";
import {IPaginateRepository} from "../common/i-paginate-repository";


export interface ITransactionRepository {
   create(data: TransactionCreationAttributes): Promise<TransactionEntity>;
   getById(id: string): Promise<TransactionEntity|null>;
   getByUserAccountId(user_id: string, account_id: string): Promise<TransactionEntity|null>;
   getAllByUserAccountId(paginate: IPaginateRepository, user_id: string, account_id: string): Promise<TransactionEntity[]>;
   countByUserAccountId(user_id: string, account_id: string): Promise<number>;
}