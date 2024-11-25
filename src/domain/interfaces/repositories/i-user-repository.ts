import {IPaginateRepository} from "../common/i-paginate-repository";
import UserEntity, {UserCreationAttributes} from "../../entities/user-entity";

export interface IUserRepository {
    allUsers(paginate:IPaginateRepository): Promise<UserEntity[]>;
    create(user:UserCreationAttributes): Promise<UserEntity>;
    userByEmail(email:string): Promise<UserEntity|null>;
    userById(id:string): Promise<UserEntity|null>;
}