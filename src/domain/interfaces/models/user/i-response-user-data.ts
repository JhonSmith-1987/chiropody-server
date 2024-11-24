import {UserAttributes} from "../../../entities/user-entity";

export interface IResponseUserData extends Omit<UserAttributes, 'password'|'start_date'>{
    startDate: string;
}