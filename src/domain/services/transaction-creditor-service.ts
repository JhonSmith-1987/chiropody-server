import {IResponseServerWithData} from "../interfaces/common/i-response-server-with-data";
import {ITransactionCreditorService} from "../interfaces/services/i-transaction-creditor-service";
import {IAmountCreditorRepository} from "../interfaces/repositories/i-amount-creditor-repository";
import {ITransactionCreditorRepository} from "../interfaces/repositories/i-transaction-creditor-repository";
import {
    ICreateTransactionCreditorService
} from "../interfaces/models/transaction-creditor/i-create-transaction-creditor-service";
import TransactionCreditorEntity, {
    TransactionCreditorCreationAttributes
} from "../entities/transaction-creditor-entity";
import {generateCreateTransactionCreditor} from "../../utils/generateCreateTransactionCreditor";

export class TransactionCreditorService implements ITransactionCreditorService {

    private transactionCreditorRepository: ITransactionCreditorRepository;
    private amountCreditorRepository: IAmountCreditorRepository;

    constructor(
        transactionCreditorRepository: ITransactionCreditorRepository,
        amountCreditorRepository: IAmountCreditorRepository,
    ) {
        this.transactionCreditorRepository = transactionCreditorRepository;
        this.amountCreditorRepository = amountCreditorRepository;
    }

    async create(data: ICreateTransactionCreditorService, user_id: string, account_id: string): Promise<IResponseServerWithData<TransactionCreditorEntity|null>> {
        try {
            const data_transaction_creditor: TransactionCreditorCreationAttributes = generateCreateTransactionCreditor(data, user_id, account_id);
            // case transaction creditor ingreso de dinero
            if (data.type === 'income') {
                const new_transaction = await this.transactionCreditorRepository.create(data_transaction_creditor);
                const amount_creditor_total = await this.amountCreditorRepository.getByUserAccountCreditorId(user_id, account_id, data.creditor_id);
                if (!amount_creditor_total) {
                    return {
                        status: 404,
                        message: 'Cuenta no tiene amount total',
                        data: null,
                    }
                }
                const new_amount = amount_creditor_total.dataValues.amount + data.amount;
                await amount_creditor_total.update({amount: new_amount});
                return {
                    status: 200,
                    message: 'Ingreso de crédito registrado exitosamente',
                    data: new_transaction,
                }
            }
            // case transaction egreso de dinero
            if (data.type === 'expenses') {
                const new_transaction = await this.transactionCreditorRepository.create(data_transaction_creditor);
                const amount_total = await this.amountCreditorRepository.getByUserAccountCreditorId(user_id, account_id, data.creditor_id);
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
                    message: 'Egreso para crédito, registrado exitosamente',
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