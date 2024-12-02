export interface ICreateTransactionService {
    amount: number;
    type: string;
    status: string;
    description: string;
    transaction_data: string;
    transaction_id: string;
}