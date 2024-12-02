import {CreditorAttributes} from "../../../entities/creditor-entity";

export interface IResponseCreditorData extends Omit<CreditorAttributes, 'start_date'> {
    startDate: string;
}