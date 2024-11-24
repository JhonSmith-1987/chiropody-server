import {IRequestCreateUser} from "../../models/user/i-request-create-user";
import {IResponseServerDefault} from "../../common/i-response-server-default";

export interface IRegisterUsersUseCase {
    execute(user: IRequestCreateUser): Promise<IResponseServerDefault>;
}