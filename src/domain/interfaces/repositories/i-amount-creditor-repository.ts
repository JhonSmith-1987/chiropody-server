import AmountTotalCreditorEntity, {AmountTotalCreditorCreationAttributes} from "../../entities/amoun-total-creditor-entity";


export interface IAmountCreditorRepository {
   create(data: AmountTotalCreditorCreationAttributes): Promise<AmountTotalCreditorEntity>;
   getById(id: string): Promise<AmountTotalCreditorEntity|null>;
   getByUserAccountCreditorId(user_id: string, account_id: string, creditor_id: string): Promise<AmountTotalCreditorEntity|null>;
}