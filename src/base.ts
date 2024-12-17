import { signWithPrivateKey } from "./sign.js";

type Config = {
    walletUUID: string;
    privateKey: string;
    serverUri: string;
};

export abstract class Base {
    private walletUUID: string;
    private privateKey: string;
    private serverUri: string;

    constructor(config: Config) {
        this.walletUUID = config.walletUUID;
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

        const signingParams = {
            body: options?.body as string,
        }
        
        const headers = {
            "Content-Type": "application/json",
            "TPG-Signature": signWithPrivateKey(signingParams.body, this.privateKey),
		    "TPG-WalletUUID": this.walletUUID,
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
