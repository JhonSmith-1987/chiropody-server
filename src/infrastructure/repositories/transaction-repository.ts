import {ITransactionRepository} from "../../domain/interfaces/repositories/i-transaction-repository";
import TransactionEntity, {TransactionCreationAttributes} from "../../domain/entities/transaction-entity";
import {IPaginateRepository} from "../../domain/interfaces/common/i-paginate-repository";


export class TransactionRepository implements ITransactionRepository {
    constructor() {
    }

    async create(data: TransactionCreationAttributes): Promise<TransactionEntity> {
        try {
            return await TransactionEntity.create(data);
        } catch (error) {
            console.error('******** error create transaction ************');
            console.error(error);
            throw error;
        }
    }

    async getById(id: string): Promise<TransactionEntity | null> {
        try {
            return await TransactionEntity.findByPk(id);
        } catch (error) {
            console.error('******** error get by id transaction ************');
            console.error(error);
            throw error;
        }
    }

    async getByUserAccountId(user_id: string, account_id: string): Promise<TransactionEntity | null> {
        try {
            return await TransactionEntity.findOne({
                where: {
                    user_id: user_id,
                    account_id: account_id,
                }
            });
        } catch (error) {
            console.error('******** error get by user_id and account_id transaction ************');
            console.error(error);
            throw error;
        }
    }

    async getAllByUserAccountId(paginate: IPaginateRepository, user_id: string, account_id: string): Promise<TransactionEntity[]> {
        try {
            return await TransactionEntity.findAll({
                offset: paginate.offset,
                limit: paginate.limit,
                where: {
                    user_id: user_id,
                    account_id: account_id,
                },
                order: [['date', 'ASC']],
            });
        } catch (error) {
            console.error('******** error get all by user_id and account_id transaction ************');
            console.error(error);
            throw error;
        }
    }

    async countByUserAccountId(user_id: string, account_id: string): Promise<number> {
        try {
            return await TransactionEntity.count({
                where: {
                    user_id: user_id,
                    account_id: account_id,
                }
            });
        } catch (error) {
            console.error('******** error count by user_id and account_id transaction ************');
            console.error(error);
            throw error;
        }
    }
}