export declare class HttpClient {
    private domain;
    constructor(domain: string, username?: string, password?: string);
    get<T>(url: string, params?: any): Promise<T>;
    post<T>(url: string, params?: any, body?: any): Promise<T>;
    private resolveURL;
}
