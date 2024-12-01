import {getPaginateRepository} from "../../utils/get-paginate-repository";
import {IAccountRepository} from "../interfaces/repositories/i-account-repository";
import {IAccountService} from "../interfaces/services/i-account-service";
import {IPaginateSearchService} from "../interfaces/common/i-paginate-search-service";
import {IResponseAccountData} from "../interfaces/models/account/i-response-account-data";
import {IResponseAllPaginateSearch} from "../interfaces/models/account/i-response-all-paginate-search";
import {formatDateInSpanish} from "../../utils/generate-date-functions";
import {IUpdateAccountService} from "../interfaces/models/account/i-update-account-service";
import {IResponseServerWithData} from "../interfaces/common/i-response-server-with-data";
import {generateAccountResponse} from "../../utils/generate-account-response";

export class AccountService implements IAccountService {

    private accountRepository: IAccountRepository;

    constructor(
        accountRepository: IAccountRepository,
    ) {
        this.accountRepository = accountRepository;
    }

    async allAccountPaginateAndSearch(paginate:IPaginateSearchService): Promise<IResponseAllPaginateSearch<IResponseAccountData[]>> {
        try {
            const paginate_repository = getPaginateRepository({
                page: paginate.page,
                size: paginate.size
            });
            if (paginate.type === 'search') {
                const dataAccounts: IResponseAccountData[] = [];
                const total_count = await this.accountRepository.countSearchAccountPaginate(paginate.search);
                const accounts = await this.accountRepository.searchAccountPaginate(paginate_repository, paginate.search);
                for (const r of accounts) {
                    dataAccounts.push({
                        id: r.dataValues.id,
                        name: r.dataValues.name,
                        phone: r.dataValues.phone,
                        status: r.dataValues.status,
                        address: r.dataValues.address,
                        startDate: formatDateInSpanish(r.dataValues.start_date)
                    });
                }
                return {
                    status: 200,
                    message: 'Datos de la busqueda de cuentas',
                    total_count: total_count,
                    data: dataAccounts
                }
            } else {
                const dataAccounts: IResponseAccountData[] = [];
                const total_count = await this.accountRepository.countAccountPaginate();
                const accounts = await this.accountRepository.allAccountPaginate(paginate_repository);
                for (const r of accounts) {
                    dataAccounts.push({
                        id: r.dataValues.id,
                        name: r.dataValues.name,
                        phone: r.dataValues.phone,
                        status: r.dataValues.status,
                        address: r.dataValues.address,
                        startDate: formatDateInSpanish(r.dataValues.start_date)
                    });
                }
                return {
                    status: 200,
                    message: 'Todas las cuentas',
                    total_count: total_count,
                    data: dataAccounts
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async updateAccount(data: IUpdateAccountService, id: string): Promise<IResponseServerWithData<IResponseAccountData | null>> {
        try {
            const account = await this.accountRepository.accountById(id);
            if (!account) {
                return {
                    status: 404,
                    message: 'No existe cuenta',
                    data: null
                }
            }
            const response = await account.update(data);
            const accountUpdated = generateAccountResponse(response);
            return {
                status: 200,
                message: 'Cuenta actualizada',
                data: accountUpdated
            }
        } catch (error) {
            throw error;
        }
    }
}