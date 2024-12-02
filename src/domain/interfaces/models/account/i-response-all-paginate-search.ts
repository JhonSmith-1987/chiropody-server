import {IResponseServerDefault} from "../../common/i-response-server-default";

export interface IResponseAllPaginateSearch<T> extends IResponseServerDefault {
    total_count: number;
    data: T;
}