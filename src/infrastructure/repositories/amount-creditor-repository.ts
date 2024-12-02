import AmountTotalCreditorEntity, {AmountTotalCreditorCreationAttributes} from "../../domain/entities/amoun-total-creditor-entity";
import {IAmountCreditorRepository} from "../../domain/interfaces/repositories/i-amount-creditor-repository";


export class AmountCreditorRepository implements IAmountCreditorRepository {
    constructor() {
    }

    async create(data: AmountTotalCreditorCreationAttributes): Promise<AmountTotalCreditorEntity> {
        try {
            return await AmountTotalCreditorEntity.create(data);
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string): Promise<AmountTotalCreditorEntity | null> {
        try {
            return await AmountTotalCreditorEntity.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    async getByUserAccountCreditorId(user_id: string, account_id: string, creditor_id: string): Promise<AmountTotalCreditorEntity | null> {
        try {
            return await AmountTotalCreditorEntity.findOne({
                where: {
                    user_id: user_id,
                    account_id: account_id,
                    creditor_id: creditor_id,
                }
            });
        } catch (error) {
            throw error;
        }
    }
}