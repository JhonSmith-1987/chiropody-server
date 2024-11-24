import {IGetAllUsersUseCase} from "../../interfaces/use-case/user/i-get-all-users-use-case";
import {IUserService} from "../../interfaces/services/i-user-service";
import {IPaginateService} from "../../interfaces/common/i-paginate-service";
import {IResponseAllUsers} from "../../interfaces/models/user/i-response-all-users";
import {IAllUsers} from "../../interfaces/models/user/i-all-users";

export class GetAllUsersUseCase implements IGetAllUsersUseCase {

    private userService: IUserService;

    constructor(
        userService: IUserService,
    ) {
        this.userService = userService;
    }

    async execute(paginate: IPaginateService): Promise<IResponseAllUsers<IAllUsers[]>> {
        try {
            return this.userService.allUsers(paginate);
        } catch (error) {
            throw error;
        }
    }
}