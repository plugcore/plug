/// <reference types="node" />
import { URL } from 'url';
export declare class HttpUtils {
    static call<T>(url: URL, params?: any, body?: object): Promise<T>;
}
