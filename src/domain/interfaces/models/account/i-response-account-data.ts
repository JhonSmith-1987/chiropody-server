import {AccountAttributes} from "../../../entities/account-entity";

export interface IResponseAccountData extends Omit<AccountAttributes, 'start_date'> {
    startDate: string;
}