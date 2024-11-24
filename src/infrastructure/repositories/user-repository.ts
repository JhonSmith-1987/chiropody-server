import {IUserRepository} from "../../domain/interfaces/repositories/i-user-repository";
import {IPaginateRepository} from "../../domain/interfaces/common/i-paginate-repository";
import UserEntity from "../../domain/entities/user-entity";

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
}