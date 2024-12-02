import {IResponseServerWithData} from "../interfaces/common/i-response-server-with-data";
import {IAmountCreditorService} from "../interfaces/services/i-amount-creditor-service";
import {IAmountCreditorRepository} from "../interfaces/repositories/i-amount-creditor-repository";

export class AmountCreditorService implements IAmountCreditorService {

    private amountCreditorRepository: IAmountCreditorRepository;

    constructor(
        amountCreditorRepository: IAmountCreditorRepository,
    ) {
        this.amountCreditorRepository = amountCreditorRepository;
    }

    async totalAmountCreditorOfUser(user_id: string, account_id: string, creditor_id: string): Promise<IResponseServerWithData<number>> {
        try {
            const response = await this.amountCreditorRepository.getByUserAccountCreditorId(user_id, account_id, creditor_id);
            if (!response) {
                return {
                    status: 404,
                    message: 'No existe dato en la db',
                    data: 0
                }
            }
            return {
                status: 200,
                message: 'Deuda del usuario con el acreedor',
                data: response.dataValues.amount
            }
        } catch (error) {
            throw error;
        }
    }
}