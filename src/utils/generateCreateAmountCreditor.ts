import {AmountTotalCreditorCreationAttributes} from "../domain/entities/amoun-total-creditor-entity";

export function generateCreateAmountCreditor(user_id: string, account_id:string, creditor_id: string): AmountTotalCreditorCreationAttributes {
    return {
        amount: 0,
        user_id: user_id,
        account_id: account_id,
        creditor_id: creditor_id,
    }
}