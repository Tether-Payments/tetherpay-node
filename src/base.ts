import { generateSignature } from "./sign";

type Config = {
    privateKey: string;
    serverUri: string;
};

export abstract class Base {
    private privateKey: string;
    private serverUri: string;

    constructor(config: Config) {
        this.privateKey = config.privateKey;
        this.serverUri = config.serverUri;

        if (!this.privateKey) {
            throw new Error('privateKey is required')
        }

        if (!this.serverUri) {
            throw new Error('serverUri is required')
        }
    }

    protected async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${this.serverUri}${endpoint}`;
        const ts = new Date().getTime();

        const signingParams = {
            method: options?.method || 'GET',
            uri: url,
            timestamp: ts,
            body: options?.body as string,
        }
        
        const headers = {
            "Content-Type": "application/json",
            "X-Signature": generateSignature(this.privateKey, signingParams),
            'X-Timestamp': ts,
        };
        const config = Object.assign({}, options, { headers });

        const response = await fetch(url, config);

        if (response.ok) {
            const data = await response.json();
            return data as T;
        }

        throw new Error(response.statusText);
    }
}