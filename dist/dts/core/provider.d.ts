import { ethers } from "ethers";
import { RequestArguments } from "./providers/EIP_1193";
import * as sup from "./sup";
type ProviderEventName = "connect" | "disconnect" | "chainChanged" | "accountsChanged";
interface EIP_1193_Provider {
    isMetaMask?: boolean;
    isCoinbaseWallet?: boolean;
    on(event_name: ProviderEventName, fn: sup.any_fn): void;
    removeListener(event_name: ProviderEventName, fn: sup.any_fn): boolean;
    request(args: RequestArguments): Promise<unknown>;
}
interface ExternallyOwnedAccount {
    readonly address: string;
    readonly privateKey: string;
}
export declare class Provider implements EIP_1193_Provider {
    readonly private_key: any;
    readonly rpc_url: string;
    readonly request: {
        (args: RequestArguments): Promise<unknown>;
    };
    constructor(private_key: ethers.BytesLike | ExternallyOwnedAccount | ethers.utils.SigningKey, rpc_url?: string);
    on(event_name: ProviderEventName, fn: sup.any_fn): void;
    removeListener(event_name: ProviderEventName, fn: sup.any_fn): boolean;
}
export {};
