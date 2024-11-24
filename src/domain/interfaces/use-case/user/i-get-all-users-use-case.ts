import {IPaginateService} from "../../common/i-paginate-service";
import {IResponseAllUsers} from "../../models/user/i-response-all-users";
import {IAllUsers} from "../../models/user/i-all-users";

export interface IGetAllUsersUseCase {
    execute(paginate: IPaginateService): Promise<IResponseAllUsers<IAllUsers[]>>;
}