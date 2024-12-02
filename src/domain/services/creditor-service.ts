import {IResponseServerWithData} from "../interfaces/common/i-response-server-with-data";
import {ICreditorService} from "../interfaces/services/i-creditor-service";
import {ICreateCreditorService} from "../interfaces/models/creditor/i-create-creditor-service";
import {CreditorAttributes, CreditorCreationAttributes} from "../entities/creditor-entity";
import {ICreditorRepository} from "../interfaces/repositories/i-creditor-repository";
import {generateCreateCreditor} from "../../utils/generateCreateCreditor";
import {IAmountCreditorRepository} from "../interfaces/repositories/i-amount-creditor-repository";
import {generateCreateAmountCreditor} from "../../utils/generateCreateAmountCreditor";
import {IPaginateSearchService} from "../interfaces/common/i-paginate-search-service";
import {IResponseAllPaginateSearch} from "../interfaces/models/account/i-response-all-paginate-search";
import {getPaginateRepository} from "../../utils/get-paginate-repository";
import {IResponseCreditorData} from "../interfaces/models/creditor/i-response-creditor-data";
import {formatDateInSpanish} from "../../utils/generate-date-functions";
import {ICreditorId} from "../interfaces/models/creditor/i-creditor-id";
import {IUserDataToken} from "../interfaces/models/user/i-user-data-token";
import {IUpdateCreditor} from "../interfaces/models/creditor/i-update-creditor";

export class CreditorService implements ICreditorService {

    private creditorRepository: ICreditorRepository;
    private amountCreditorRepository: IAmountCreditorRepository;

    constructor(
        creditorRepository: ICreditorRepository,
        amountCreditorRepository: IAmountCreditorRepository,
    ) {
        this.creditorRepository = creditorRepository;
        this.amountCreditorRepository = amountCreditorRepository;
    }

    async create(data: ICreateCreditorService, user_id: string, account_id: string): Promise<IResponseServerWithData<CreditorAttributes|null>> {
        try {
            const existCreditor = await this.creditorRepository.getByIdentification(data.identification);
            if (existCreditor) {
                return {
                    status: 404,
                    message: `Acreedor con cédula ${data.identification} ya existe`,
                    data: null
                }
            }
            const creditor_data: CreditorCreationAttributes = generateCreateCreditor(data, user_id, account_id);
            const new_creditor = await this.creditorRepository.create(creditor_data);
            const amount_Creditor_data = generateCreateAmountCreditor(user_id, account_id, new_creditor.dataValues.id);
            await this.amountCreditorRepository.create(amount_Creditor_data);
            return {
                status: 200,
                message: `Acreedor ${data.name} creado exitosamente`,
                data: new_creditor
            }
        } catch (error) {
            throw error;
        }
    }

    async allPaginateSearch(paginate: IPaginateSearchService, user_id: string, account_id: string): Promise<IResponseAllPaginateSearch<IResponseCreditorData[]>> {
        try {
            console.log('*************** paginacion al buscar u obtener creditors *****************');
            console.log(paginate);
            console.log('*************** datos del usuario logueado *****************');
            console.log(user_id);
            console.log(account_id);
            const paginate_repository = getPaginateRepository({
                page: paginate.page,
                size: paginate.size
            });
            const all_creditors: IResponseCreditorData[] = [];
            if (paginate.type === 'all') {
                const total_count = await this.creditorRepository.countByUserAccountId(user_id, account_id);
                const creditors = await this.creditorRepository.getAllByUserAccountId(paginate_repository, user_id, account_id);
                if (creditors.length > 0) {
                    for (const r of creditors) {
                        all_creditors.push({
                            id: r.dataValues.id,
                            name: r.dataValues.name,
                            phone: r.dataValues.phone,
                            account_id: r.dataValues.account_id,
                            user_id: r.dataValues.user_id,
                            identification: r.dataValues.identification,
                            address: r.dataValues.address,
                            startDate: formatDateInSpanish(r.dataValues.start_date),
                        });
                    }
                }
                return {
                    status: 200,
                    message: 'Todos los acreedores',
                    total_count: total_count,
                    data: all_creditors
                }
            }
            if (paginate.type === 'search') {
                const total_count = await this.creditorRepository.countSearchByUserAccountId(user_id, account_id, paginate.search);
                const creditorsSearch = await this.creditorRepository.searchAllByUserAccountId(paginate_repository, user_id, account_id, paginate.search);
                if (creditorsSearch.length > 0) {
                    for (const r of creditorsSearch) {
                        all_creditors.push({
                            id: r.dataValues.id,
                            name: r.dataValues.name,
                            phone: r.dataValues.phone,
                            account_id: r.dataValues.account_id,
                            user_id: r.dataValues.user_id,
                            identification: r.dataValues.identification,
                            address: r.dataValues.address,
                            startDate: formatDateInSpanish(r.dataValues.start_date),
                        });
                    }
                    return {
                        status: 200,
                        message: 'Busqueda de acreedores',
                        total_count: total_count,
                        data: all_creditors
                    }
                }
                return {
                    status: 201,
                    message: 'No se encontraron datos',
                    total_count: total_count,
                    data: all_creditors
                }
            }
            return {
                status: 404,
                message: 'No existe type paginate search',
                total_count: 0,
                data: []
            }
        } catch (error) {
            throw error;
        }
    }

    async creditorById(data: ICreditorId, userActive:IUserDataToken): Promise<IResponseServerWithData<IResponseCreditorData | null>> {
        try {
            const creditor = await this.creditorRepository.getById(data.id);
            if (!creditor) {
                return {
                    status: 404,
                    message: 'No se encontraron datos',
                    data: null
                }
            }
            if (creditor && creditor.dataValues.user_id !== userActive.user.id || creditor.dataValues.account_id !== userActive.account.id) {
                return {
                    status: 404,
                    message: 'Dato no pertenece a la cuenta de usuario',
                    data: null
                }
            }
            return {
                status: 200,
                message: 'Acreedor seleccionado',
                data: {
                    id: creditor.dataValues.id,
                    name: creditor.dataValues.name,
                    phone: creditor.dataValues.phone,
                    account_id: creditor.dataValues.account_id,
                    user_id: creditor.dataValues.user_id,
                    identification: creditor.dataValues.identification,
                    address: creditor.dataValues.address,
                    startDate: formatDateInSpanish(creditor.dataValues.start_date),
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async updateById(data: IUpdateCreditor, dataId: ICreditorId): Promise<IResponseServerWithData<IResponseCreditorData | null>> {
        try {
            const creditor = await this.creditorRepository.getById(dataId.id);
            if (!creditor) {
                return {
                    status: 404,
                    message: 'No existe acreedor',
                    data: null,
                }
            }
            const response = await creditor.update(data);
            return {
                status: 200,
                message: 'Acreedor actualizado exitosamente',
                data: {
                    id: response.dataValues.id,
                    name: response.dataValues.name,
                    phone: response.dataValues.phone,
                    account_id: response.dataValues.account_id,
                    user_id: response.dataValues.user_id,
                    identification: response.dataValues.identification,
                    address: response.dataValues.address,
                    startDate: formatDateInSpanish(response.dataValues.start_date),
                }
            }
        } catch (error) {
            throw error;
        }
    }
}