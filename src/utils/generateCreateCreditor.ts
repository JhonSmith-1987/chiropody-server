import {ICreateCreditorService} from "../domain/interfaces/models/creditor/i-create-creditor-service";
import {CreditorCreationAttributes} from "../domain/entities/creditor-entity";
import {getCurrentTimestampToSeconds} from "./generate-date-functions";

export function generateCreateCreditor(data: ICreateCreditorService, user_id: string, account_id:string): CreditorCreationAttributes {
    return {
        name: data.name,
        identification: data.identification,
        phone: data.phone,
        address: data.address,
        start_date: getCurrentTimestampToSeconds(),
        user_id: user_id,
        account_id: account_id
    }
}