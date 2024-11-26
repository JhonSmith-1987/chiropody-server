import {IResponseServerDefault} from "./i-response-server-default";

export interface IResponseServerWithData<T> extends IResponseServerDefault {
    data: T
}