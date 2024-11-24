import {IPaginateService} from "../common/i-paginate-service";
import {IResponseAllUsers} from "../models/user/i-response-all-users";
import {IAllUsers} from "../models/user/i-all-users";
import {IRequestCreateUser} from "../models/user/i-request-create-user";
import {IResponseServerDefault} from "../common/i-response-server-default";
import {ILogin} from "../models/user/i-login";
import {IResponseLogin} from "../models/user/i-response-login";

export interface IUserService {
    allUsers(paginate:IPaginateService): Promise<IResponseAllUsers<IAllUsers[]>>;
    create(user:IRequestCreateUser): Promise<IResponseServerDefault>;
    login(login:ILogin): Promise<IResponseLogin<string|null>>;
}