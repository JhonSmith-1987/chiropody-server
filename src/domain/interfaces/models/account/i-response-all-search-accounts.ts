import {IResponseServerDefault} from "../../common/i-response-server-default";

export interface IResponseAllSearchAccounts<T> extends IResponseServerDefault {
    total_count: number;
    data: T;
}