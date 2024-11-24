import {IUserRepository} from "../../domain/interfaces/repositories/i-user-repository";
import {IPaginateRepository} from "../../domain/interfaces/common/i-paginate-repository";
import UserEntity, {UserCreationAttributes} from "../../domain/entities/user-entity";

export class UserRepository implements IUserRepository {
    constructor() {
    }

    async allUsers(paginate: IPaginateRepository): Promise<UserEntity[]> {
        try {
            return await UserEntity.findAll({
                offset: paginate.offset,
                limit: paginate.limit,
            });
        } catch (error) {
            throw error;
        }
    }

    async create(user: UserCreationAttributes): Promise<UserEntity> {
        try {
            return await UserEntity.create(user);
        } catch (error) {
            throw error;
        }
    }

    async userByEmail(email: string): Promise<UserEntity | null> {
        try {
            return await UserEntity.findOne({
                where: {
                    email: email,
                }
            });
        } catch (error) {
            throw error;
        }
    }
}