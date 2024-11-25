import {IAccountRepository} from "../../domain/interfaces/repositories/i-account-repository";
import AccountEntity, {AccountCreationAttributes} from "../../domain/entities/account-entity";
import {IPaginateRepository} from "../../domain/interfaces/common/i-paginate-repository";
import {Op} from "sequelize";

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

    async allAccountPaginate(paginate:IPaginateRepository): Promise<AccountEntity[]> {
        try {
            return await AccountEntity.findAll({
                offset: paginate.offset,
                limit: paginate.limit,
            });
        } catch (error) {
            throw error;
        }
    }

    async countAccountPaginate(): Promise<number> {
        try {
            return await AccountEntity.count();
        } catch (error) {
            throw error;
        }
    }

    async searchAccountPaginate(paginate:IPaginateRepository, search: string): Promise<AccountEntity[]> {
        try {
            return await AccountEntity.findAll({
                offset: paginate.offset,
                limit: paginate.limit,
                where: {
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${search}%` } },
                        { address: { [Op.iLike]: `%${search}%` } },
                        { phone: { [Op.iLike]: `%${search}%` } },
                    ]
                }
            })
        } catch (error) {
            throw error;
        }
    }

    async countSearchAccountPaginate(search: string): Promise<number> {
        try {
            return await AccountEntity.count({
                where: {
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${search}%` } },
                        { address: { [Op.iLike]: `%${search}%` } },
                        { phone: { [Op.iLike]: `%${search}%` } },
                    ]
                }
            })
        } catch (error) {
            throw error;
        }
    }
}