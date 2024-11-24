import AccountEntity, {AccountCreationAttributes} from "../../entities/account-entity";

export interface IAccountRepository {
    create(account:AccountCreationAttributes): Promise<AccountEntity>;
}