import {IUserDataToken} from "../../models/user/i-user-data-token";
import {IResponseServerWithData} from "../../common/i-response-server-with-data";

export interface IAmountTotalUserUseCase {
    execute(userActive:IUserDataToken): Promise<IResponseServerWithData<number>>;
}