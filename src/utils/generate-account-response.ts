import AccountEntity from "../domain/entities/account-entity";
import {IResponseAccountData} from "../domain/interfaces/models/account/i-response-account-data";
import {formatDateInSpanish} from "./generate-date-functions";

export function generateAccountResponse(account:AccountEntity): IResponseAccountData {
    return {
        id: account.dataValues.id,
        name: account.dataValues.name,
        status: account.dataValues.status,
        phone: account.dataValues.phone,
        address: account.dataValues.address,
        startDate: formatDateInSpanish(account.dataValues.start_date)
    }
}