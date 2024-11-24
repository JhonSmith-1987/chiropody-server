import {IUserService} from "../interfaces/services/i-user-service";
import {IUserRepository} from "../interfaces/repositories/i-user-repository";
import {IPaginateService} from "../interfaces/common/i-paginate-service";
import {IResponseAllUsers} from "../interfaces/models/user/i-response-all-users";
import {IAllUsers} from "../interfaces/models/user/i-all-users";
import {getPaginateRepository} from "../../utils/get-paginate-repository";

export class UserService implements IUserService {

    private userRepository: IUserRepository;

    constructor(
        userRepository: IUserRepository,
    ) {
        this.userRepository = userRepository;
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
}