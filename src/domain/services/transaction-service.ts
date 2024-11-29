import {IResponseServerWithData} from "../interfaces/common/i-response-server-with-data";
import {ITransactionService} from "../interfaces/services/i-transaction-service";
import {ITransactionRepository} from "../interfaces/repositories/i-transaction-repository";
import {ICreateTransactionService} from "../interfaces/models/transaction/i-create-transaction-service";
import {TransactionAttributes, TransactionCreationAttributes} from "../entities/transaction-entity";
import {IAmountTotalRepository} from "../interfaces/repositories/i-amount-total-repository";
import {generateCreateTransaction} from "../../utils/generateCreateTransaction";

export class TransactionService implements ITransactionService {

    private transactionRepository: ITransactionRepository;
    private amountTotalRepository: IAmountTotalRepository;

    constructor(
        transactionRepository: ITransactionRepository,
        amountTotalRepository: IAmountTotalRepository,
    ) {
        this.transactionRepository = transactionRepository;
        this.amountTotalRepository = amountTotalRepository;
    }

    async create(data: ICreateTransactionService, user_id: string, account_id: string): Promise<IResponseServerWithData<TransactionAttributes|null>> {
        try {
            const data_transaction: TransactionCreationAttributes = generateCreateTransaction(data, user_id, account_id);
            // case transaction ingreso de dinero
            if (data.type === 'income') {
                const new_transaction = await this.transactionRepository.create(data_transaction);
                const amount_total = await this.amountTotalRepository.getByUserAccountId(user_id, account_id);
                if (!amount_total) {
                    return {
                        status: 204,
                        message: 'Cuenta no tiene amount total',
                        data: null,
                    }
                }
                const new_amount = amount_total.dataValues.amount + data.amount;
                await amount_total.update({amount: new_amount});
                return {
                    status: 200,
                    message: 'Ingreso registrado exitosamente',
                    data: new_transaction,
                }
            }
            // case transaction egreso de dinero
            if (data.type === 'expenses') {
                const new_transaction = await this.transactionRepository.create(data_transaction);
                const amount_total = await this.amountTotalRepository.getByUserAccountId(user_id, account_id);
                if (!amount_total) {
                    return {
                        status: 404,
                        message: 'Cuenta no tiene amount total',
                        data: null,
                    }
                }
                const new_amount = amount_total.dataValues.amount - data.amount;
                await amount_total.update({amount: new_amount});
                return {
                    status: 200,
                    message: 'Egreso registrado exitosamente',
                    data: new_transaction,
                }
            }
            return {
                status: 404,
                message: 'Typo de transaccion no existente',
                data: null,
            }
        } catch (error) {
            throw error;
        }
    }
}