import { ifFoodApiConfig } from "../../config";
import axios from "axios";

interface Payload {
    id?: string;
    body?: unknown;
    params?: unknown;
    headers?: Record<string, string>;
}

export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

export class Api {
    private readonly baseUrl: string;
    private readonly resource: string;

    constructor(resource: string) {
        this.baseUrl = ifFoodApiConfig.url;
        this.resource = resource;
    }

    private mountRequestUrl(id?: string, urlExtension?: string) {
        switch (true) {
            case !!id && !!urlExtension:
                return `${this.baseUrl}/${this.resource}/${urlExtension}/${id}`;
            case !!id && !urlExtension:
                return `${this.baseUrl}/${this.resource}/${id}`;
            case !id && !!urlExtension:
                return `${this.baseUrl}/${this.resource}/${urlExtension}`;
            default:
                return `${this.baseUrl}/${this.resource}`;
        }
    }

    public request({
        method,
        payload = { headers: {} },
        urlExtension,
    }: {
        method: Method;
        payload: Payload;
        urlExtension?: string;
    }) {
        const defaultHeaders = payload.body
            ? {
                  "Content-Type": "application/json",
              }
            : {};

        return axios({
            url: this.mountRequestUrl(payload.id, urlExtension),
            method: method,
            data: payload.body,
            params: payload.params,
            headers: {
                ...defaultHeaders,
                ...payload.headers,
            },
        });
    }
}
