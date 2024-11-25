import AccountEntity, {AccountCreationAttributes} from "../../entities/account-entity";
import {IPaginateRepository} from "../common/i-paginate-repository";

export interface IAccountRepository {
    create(account:AccountCreationAttributes): Promise<AccountEntity>;
    accountByName(name:string): Promise<AccountEntity|null>;
    accountById(id:string): Promise<AccountEntity|null>;
    allAccountPaginate(paginate:IPaginateRepository): Promise<AccountEntity[]>;
    countAccountPaginate(): Promise<number>;
    searchAccountPaginate(paginate:IPaginateRepository, search: string): Promise<AccountEntity[]>;
    countSearchAccountPaginate(search: string): Promise<number>;
}