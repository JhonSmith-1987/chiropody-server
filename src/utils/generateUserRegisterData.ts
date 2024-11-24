import {UserCreationAttributes} from "../domain/entities/user-entity";
import {getCurrentTimeInSeconds} from "./getCurrentTimeInSeconds";
import {IRequestUserRegister} from "../domain/interfaces/models/user-model";
import {hashPassword} from "../infrastructure/config/BcryptPassword";

export async function generateUserRegisterData(user: IRequestUserRegister):Promise<UserCreationAttributes> {
    const pass_hash = await hashPassword(user.password);
    return {
        full_name: user.full_name,
        email: user.email,
        password: pass_hash,
        phone: user.phone,
        registration_date: getCurrentTimeInSeconds(),
        role: 'customer',
        gender: user.gender,
        identification: user.identification,
        date_birth: user.date_birth
    }
}