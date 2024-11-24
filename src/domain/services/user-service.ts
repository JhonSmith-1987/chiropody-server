import {IUserService} from "../interfaces/services/i-user-service";
import {IUserRepository} from "../interfaces/repositories/i-user-repository";
import {IPaginateService} from "../interfaces/common/i-paginate-service";
import {IResponseAllUsers} from "../interfaces/models/user/i-response-all-users";
import {IAllUsers} from "../interfaces/models/user/i-all-users";
import {getPaginateRepository} from "../../utils/get-paginate-repository";
import {IRequestCreateUser} from "../interfaces/models/user/i-request-create-user";
import {IResponseServerDefault} from "../interfaces/common/i-response-server-default";
import {IAccountRepository} from "../interfaces/repositories/i-account-repository";
import {generateCreateAccount} from "../../utils/generateCreateAccount";
import {generateCreateUser} from "../../utils/generateCreateUser";

export class UserService implements IUserService {

    private userRepository: IUserRepository;
    private accountRepository: IAccountRepository;

    constructor(
        userRepository: IUserRepository,
        accountRepository: IAccountRepository,
    ) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
    }

    async allUsers(paginate: IPaginateService): Promise<IResponseAllUsers<IAllUsers[]>> {
        try {
            const paginate_repository = getPaginateRepository(paginate);
            const response = await this.userRepository.allUsers(paginate_repository);
            if (response.length === 0) {
                return {
                    status: 200,
                    message: 'No hay usuarios',
                    data: []
                }
            }
            const data: IAllUsers[] = [];
            for (const r of response) {
                data.push({
                    id: r.dataValues.id,
                    email: r.dataValues.email,
                    name: r.dataValues.name,
                    account_id: r.dataValues.account_id,
                    roll: r.dataValues.roll,
                    phone: r.dataValues.phone,
                    start_date: r.dataValues.start_date
                });
            }
            return {
                status: 200,
                message: 'Estos son todos los usuarios',
                data: data
            }
        } catch (error) {
            throw error;
        }
    }

    async create(user: IRequestCreateUser): Promise<IResponseServerDefault> {
        try {
            const exist_account = await this.accountRepository.accountByName(user.name_account);
            if (exist_account) {
                return {
                    status: 409,
                    message: 'Ya existe esta cuenta',
                }
            }
            const exist_user = await this.userRepository.userByEmail(user.email_user);
            if (exist_user) {
                return {
                    status: 409,
                    message: 'Ya existe el usuario',
                }
            }
            const account_data = generateCreateAccount(user);
            const new_account = await this.accountRepository.create(account_data);
            const user_data = await generateCreateUser(user, new_account.dataValues.id);
            const new_user = await this.userRepository.create(user_data);
            console.log(new_user);
            return {
                status: 200,
                message: 'Usuario y cuenta creados exitosamente',
            }
        } catch (error) {
            throw error;
        }
    }
}