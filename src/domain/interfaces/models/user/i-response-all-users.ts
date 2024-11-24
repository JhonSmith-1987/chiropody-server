import {IResponseServerDefault} from "../../common/i-response-server-default";

export interface IResponseAllUsers<T> extends IResponseServerDefault {
    data: T;
}