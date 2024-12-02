import {IPaginateRepository} from "../../domain/interfaces/common/i-paginate-repository";
import {ICreditorRepository} from "../../domain/interfaces/repositories/i-creditor-repository";
import CreditorEntity, {CreditorCreationAttributes} from "../../domain/entities/creditor-entity";
import {Op} from "sequelize";


export class CreditorRepository implements ICreditorRepository {
    constructor() {
    }

    async create(data: CreditorCreationAttributes): Promise<CreditorEntity> {
        try {
            return await CreditorEntity.create(data);
        } catch (error) {
            console.error('******** error create creditor ************');
            console.error(error);
            throw error;
        }
    }

    async getById(id: string): Promise<CreditorEntity | null> {
        try {
            return await CreditorEntity.findByPk(id);
        } catch (error) {
            console.error('******** error get by id creditor ************');
            console.error(error);
            throw error;
        }
    }

    async getByIdentification(identification: string): Promise<CreditorEntity | null> {
        try {
            return await CreditorEntity.findOne({
                where: {
                    identification: identification,
                }
            });
        } catch (error) {
            console.error('******** error get by identification creditor ************');
            console.error(error);
            throw error;
        }
    }

    async getByUserAccountId(user_id: string, account_id: string): Promise<CreditorEntity | null> {
        try {
            return await CreditorEntity.findOne({
                where: {
                    user_id: user_id,
                    account_id: account_id,
                }
            });
        } catch (error) {
            console.error('******** error get by user_id and account_id creditor ************');
            console.error(error);
            throw error;
        }
    }

    async getAllByUserAccountId(paginate: IPaginateRepository, user_id: string, account_id: string): Promise<CreditorEntity[]> {
        try {
            return await CreditorEntity.findAll({
                offset: paginate.offset,
                limit: paginate.limit,
                where: {
                    user_id: user_id,
                    account_id: account_id,
                },
                order: [['start_date', 'ASC']],
            });
        } catch (error) {
            console.error('******** error get all by user_id and account_id creditor ************');
            console.error(error);
            throw error;
        }
    }

    async countByUserAccountId(user_id: string, account_id: string): Promise<number> {
        try {
            return await CreditorEntity.count({
                where: {
                    user_id: user_id,
                    account_id: account_id,
                }
            });
        } catch (error) {
            console.error('******** error count by user_id and account_id creditor ************');
            console.error(error);
            throw error;
        }
    }

    async searchAllByUserAccountId(paginate: IPaginateRepository, user_id: string, account_id: string, search: string): Promise<CreditorEntity[]> {
        try {
            return await CreditorEntity.findAll({
                offset: paginate.offset,
                limit: paginate.limit,
                where: {
                    user_id: user_id,
                    account_id: account_id,
                    [Op.or]: [
                        {
                            name: {[Op.iLike]: `%${search}%`}
                        },
                        {
                            phone: {[Op.iLike]: `%${search}%`}
                        },
                        {
                            identification: {[Op.iLike]: `%${search}%`}
                        },
                    ],
                },
                order: [['start_date', 'ASC']],
            });
        } catch (error) {
            console.error('******** error search all by user_id and account_id creditor ************');
            console.error(error);
            throw error;
        }
    }

    async countSearchByUserAccountId(user_id: string, account_id: string, search: string): Promise<number> {
        try {
            return await CreditorEntity.count({
                where: {
                    user_id: user_id,
                    account_id: account_id,
                    [Op.or]: [
                        {
                            name: {[Op.iLike]: `%${search}%`}
                        },
                        {
                            phone: {[Op.iLike]: `%${search}%`}
                        },
                        {
                            identification: {[Op.iLike]: `%${search}%`}
                        },
                    ],
                }
            });
        } catch (error) {
            console.error('******** error count search by user_id and account_id creditor ************');
            console.error(error);
            throw error;
        }
    }
}