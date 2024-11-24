import {UserAttributes} from "../../../entities/user-entity";

export interface IAllUsers extends Omit<UserAttributes, 'password'> {}