import UserEntity from "../domain/entities/user-entity";
import {IResponseUserData} from "../domain/interfaces/models/user/i-response-user-data";
import {formatDateInSpanish} from "./generate-date-functions";

export function generateUserResponse(user:UserEntity): IResponseUserData {
    return {
        id: user.dataValues.id,
        name: user.dataValues.name,
        email: user.dataValues.email,
        roll: user.dataValues.roll,
        phone: user.dataValues.phone,
        account_id: user.dataValues.account_id,
        startDate: formatDateInSpanish(user.dataValues.start_date),
    }
}