import {IPaginateService} from "../domain/interfaces/common/i-paginate-service";
import {IPaginateRepository} from "../domain/interfaces/common/i-paginate-repository";

export function getPaginateRepository(paginate:IPaginateService): IPaginateRepository {
    return {
        limit: +paginate.size,
        offset: (+paginate.page) * (+paginate.size),
    };
}