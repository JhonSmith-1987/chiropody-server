import {IAmountTotalRepository} from "../../domain/interfaces/repositories/i-amount-total-repository";
import AmountTotalEntity, {AmountTotalCreationAttributes} from "../../domain/entities/amoun-total-entity";


export class AmountTotalRepository implements IAmountTotalRepository {
    constructor() {
    }

    async create(data: AmountTotalCreationAttributes): Promise<AmountTotalEntity> {
        try {
            return await AmountTotalEntity.create(data);
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string): Promise<AmountTotalEntity | null> {
        try {
            return await AmountTotalEntity.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    async getByUserAccountId(user_id: string, account_id: string): Promise<AmountTotalEntity | null> {
        try {
            return await AmountTotalEntity.findOne({
                where: {
                    user_id: user_id,
                    account_id: account_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }
}