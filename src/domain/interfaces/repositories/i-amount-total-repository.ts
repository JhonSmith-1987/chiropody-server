import AmountTotalEntity, {AmountTotalCreationAttributes} from "../../entities/amoun-total-entity";


export interface IAmountTotalRepository {
   create(data: AmountTotalCreationAttributes): Promise<AmountTotalEntity>;
   getById(id: string): Promise<AmountTotalEntity|null>;
   getByUserAccountId(user_id: string, account_id: string): Promise<AmountTotalEntity|null>;
}