import {IUserDataToken} from "../../models/user/i-user-data-token";
import {IResponseServerWithData} from "../../common/i-response-server-with-data";
import {ICreateCreditorService} from "../../models/creditor/i-create-creditor-service";
import {CreditorAttributes} from "../../../entities/creditor-entity";

export interface ICreateCreditorUseCase {
    execute(data: ICreateCreditorService, userActive:IUserDataToken): Promise<IResponseServerWithData<CreditorAttributes|null>>;
}