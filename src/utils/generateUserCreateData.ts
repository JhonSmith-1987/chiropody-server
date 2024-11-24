import {UserCreationAttributes} from "../domain/entities/user-entity";
import {getCurrentTimeInSeconds} from "./getCurrentTimeInSeconds";

export async function generateUserCreateData(user: UserCreationAttributes):Promise<UserCreationAttributes> {
    return {
        full_name: user.full_name,
        email: user.email,
        password: '',
        phone: user.phone,
        registration_date: getCurrentTimeInSeconds(),
        role: user.role,
        gender: user.gender,
        identification: user.identification,
        date_birth: user.date_birth
    }
}