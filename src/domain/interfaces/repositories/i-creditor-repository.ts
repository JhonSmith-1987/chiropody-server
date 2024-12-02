import {IPaginateRepository} from "../common/i-paginate-repository";
import CreditorEntity, {CreditorCreationAttributes} from "../../entities/creditor-entity";


export interface ICreditorRepository {
   create(data: CreditorCreationAttributes): Promise<CreditorEntity>;
   getById(id: string): Promise<CreditorEntity|null>;
   getByIdentification(identification: string): Promise<CreditorEntity|null>;
   getByUserAccountId(user_id: string, account_id: string): Promise<CreditorEntity|null>;
   getAllByUserAccountId(paginate: IPaginateRepository, user_id: string, account_id: string): Promise<CreditorEntity[]>;
   countByUserAccountId(user_id: string, account_id: string): Promise<number>;
   searchAllByUserAccountId(paginate: IPaginateRepository, user_id: string, account_id: string, search: string): Promise<CreditorEntity[]>;
   countSearchByUserAccountId(user_id: string, account_id: string, search: string): Promise<number>;
}