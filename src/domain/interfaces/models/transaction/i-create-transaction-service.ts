export interface ICreateTransactionService {
    amount: number;
    type: string;
    description: string;
    transaction_data: string;
    transaction_id: string;
}