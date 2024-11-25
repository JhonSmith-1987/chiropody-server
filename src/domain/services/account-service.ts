import {getPaginateRepository} from "../../utils/get-paginate-repository";
import {IAccountRepository} from "../interfaces/repositories/i-account-repository";
import {IAccountService} from "../interfaces/services/i-account-service";
import {IPaginateSearchService} from "../interfaces/common/i-paginate-search-service";
import {IResponseAccountData} from "../interfaces/models/account/i-response-account-data";
import {IResponseAllSearchAccounts} from "../interfaces/models/account/i-response-all-search-accounts";
import {formatDateInSpanish} from "../../utils/generate-date-functions";

export class AccountService implements IAccountService {

    private accountRepository: IAccountRepository;

    constructor(
        accountRepository: IAccountRepository,
    ) {
        this.accountRepository = accountRepository;
    }

    async allAccountPaginateAndSearch(paginate:IPaginateSearchService): Promise<IResponseAllSearchAccounts<IResponseAccountData[]>> {
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

}