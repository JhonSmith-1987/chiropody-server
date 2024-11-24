import {IRequestCreateUser} from "../domain/interfaces/models/user/i-request-create-user";
import {AccountCreationAttributes} from "../domain/entities/account-entity";
import {getCurrentTimestampToSeconds} from "./generate-date-functions";

export function generateCreateAccount(user:IRequestCreateUser): AccountCreationAttributes {
    return {
        name: user.name_account,
        address: user.address_account,
        start_date: getCurrentTimestampToSeconds(),
        status: 'active',
        phone: user.phone_account,
    }
}