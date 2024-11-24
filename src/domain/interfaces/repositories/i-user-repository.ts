import {IPaginateRepository} from "../common/i-paginate-repository";
import UserEntity from "../../entities/user-entity";

export interface IUserRepository {
    allUsers(paginate:IPaginateRepository): Promise<UserEntity[]>;
}