import {IRequestCreateUser} from "../domain/interfaces/models/user/i-request-create-user";
import {getCurrentTimestampToSeconds} from "./generate-date-functions";
import {UserCreationAttributes} from "../domain/entities/user-entity";
import {hashPassword} from "../infrastructure/config/BcryptPassword";

export async function generateCreateUser(user:IRequestCreateUser, account_id:string): Promise<UserCreationAttributes> {
    const passHash = await hashPassword(user.password_user);
    return {
        name: user.name_user,
        start_date: getCurrentTimestampToSeconds(),
        account_id: account_id,
        phone: user.phone_user,
        roll: 'super_admin',
        email: user.email_user,
        password: passHash,
    }
}