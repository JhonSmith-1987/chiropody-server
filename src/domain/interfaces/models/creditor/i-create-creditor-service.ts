import {CreditorCreationAttributes} from "../../../entities/creditor-entity";

export interface ICreateCreditorService extends Omit<CreditorCreationAttributes, 'start_date'|'user_id'|'account_id'> {}