import {IAccountRepository} from "../../domain/interfaces/repositories/i-account-repository";
import AccountEntity, {AccountCreationAttributes} from "../../domain/entities/account-entity";

export class AccountRepository implements IAccountRepository {
    constructor() {
    }

    async create(account:AccountCreationAttributes): Promise<AccountEntity> {
        try {
            return await AccountEntity.create(account);
        } catch (error) {
            throw error;
        }
    }

    async accountByName(name: string): Promise<AccountEntity | null> {
        try {
            return await AccountEntity.findOne({
                where: {
                    name: name,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async accountById(id: string): Promise<AccountEntity | null> {
        try {
            return await AccountEntity.findByPk(id);
        } catch (error) {
            throw error;
        }
    }
}