import {AmountTotalCreationAttributes} from "../domain/entities/amoun-total-entity";

export function generateCreateAmountTotal(user_id: string, account_id:string): AmountTotalCreationAttributes {
    return {
        amount: 0,
        user_id: user_id,
        account_id: account_id,
    }
}