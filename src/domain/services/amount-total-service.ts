import {IResponseServerWithData} from "../interfaces/common/i-response-server-with-data";
import {IAmountTotalRepository} from "../interfaces/repositories/i-amount-total-repository";
import {IAmountTotalService} from "../interfaces/services/i-amount-total-service";

export class AmountTotalService implements IAmountTotalService {

    private amountTotalRepository: IAmountTotalRepository;

    constructor(
        amountTotalRepository: IAmountTotalRepository,
    ) {
        this.amountTotalRepository = amountTotalRepository;
    }

    async totalAmountOfUser(user_id: string, account_id: string): Promise<IResponseServerWithData<number>> {
        try {
            const response = await this.amountTotalRepository.getByUserAccountId(user_id, account_id);
            if (!response) {
                return {
                    status: 404,
                    message: 'No existe dato en la db',
                    data: 0
                }
            }
            return {
                status: 200,
                message: 'Monto total del usuario',
                data: response.dataValues.amount
            }
        } catch (error) {
            throw error;
        }
    }
}