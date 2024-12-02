import {IPaginateRepository} from "../../domain/interfaces/common/i-paginate-repository";
import {ITransactionCreditorRepository} from "../../domain/interfaces/repositories/i-transaction-creditor-repository";
import TransactionCreditorEntity, {
    TransactionCreditorCreationAttributes
} from "../../domain/entities/transaction-creditor-entity";


export class TransactionCreditorRepository implements ITransactionCreditorRepository {
    constructor() {
    }

    async create(data: TransactionCreditorCreationAttributes): Promise<TransactionCreditorEntity> {
        try {
            return await TransactionCreditorEntity.create(data);
        } catch (error) {
            console.error('******** error create transaction of creditor (credit) ************');
            console.error(error);
            throw error;
        }
    }

    async getById(id: string): Promise<TransactionCreditorEntity | null> {
        try {
            return await TransactionCreditorEntity.findByPk(id);
        } catch (error) {
            console.error('******** error get by id transaction of creditor (credit) ************');
            console.error(error);
            throw error;
        }
    }

    async getByUserAccountCreditorId(user_id: string, account_id: string, creditor_id: string): Promise<TransactionCreditorEntity | null> {
        try {
            return await TransactionCreditorEntity.findOne({
                where: {
                    user_id: user_id,
                    account_id: account_id,
                    creditor_id: creditor_id
                }
            });
        } catch (error) {
            console.error('******** error get by user_id and account_id transaction ************');
            console.error(error);
            throw error;
        }
    }

    async getAllByUserAccountCreditorId(paginate: IPaginateRepository, user_id: string, account_id: string, creditor_id: string): Promise<TransactionCreditorEntity[]> {
        try {
            return await TransactionCreditorEntity.findAll({
                offset: paginate.offset,
                limit: paginate.limit,
                where: {
                    user_id: user_id,
                    account_id: account_id,
                    creditor_id: creditor_id
                },
                order: [['date', 'ASC']],
            });
        } catch (error) {
            console.error('******** error get all by user_id and account_id transaction of creditor (credit) ************');
            console.error(error);
            throw error;
        }
    }

    async countByUserAccountId(user_id: string, account_id: string, creditor_id: string): Promise<number> {
        try {
            return await TransactionCreditorEntity.count({
                where: {
                    user_id: user_id,
                    account_id: account_id,
                    creditor_id: creditor_id
                }
            });
        } catch (error) {
            console.error('******** error count by user_id and account_id transaction of creditor (credit) ************');
            console.error(error);
            throw error;
        }
    }
}