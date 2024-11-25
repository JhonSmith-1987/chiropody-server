import {IPaginateService} from "./i-paginate-service";

export interface IPaginateSearchService extends IPaginateService {
    search: string;
    type: string;
}