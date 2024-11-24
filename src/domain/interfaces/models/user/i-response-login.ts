import {IResponseServerDefault} from "../../common/i-response-server-default";

export interface IResponseLogin<T> extends IResponseServerDefault {
    token: T;
    user_roll: string|null;
}