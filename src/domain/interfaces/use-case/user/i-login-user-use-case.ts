import {ILogin} from "../../models/user/i-login";
import {IResponseLogin} from "../../models/user/i-response-login";

export interface ILoginUserUseCase {
    execute(login: ILogin): Promise<IResponseLogin<string | null>>;
}