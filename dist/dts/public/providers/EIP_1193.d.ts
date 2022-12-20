export type { RequestArguments, ProviderRpcError, ProviderEventName, } from "../../core/providers/EIP_1193";
import type { any_fn } from "../sup";
import type { RequestArguments, ProviderEventName } from "./EIP_1193";
export interface EIP_1193_Provider {
    isMetaMask?: boolean;
    isCoinbaseWallet?: boolean;
    on(event_name: ProviderEventName, fn: any_fn): void;
    removeListener(event_name: ProviderEventName, fn: any_fn): boolean;
    request(args: RequestArguments): Promise<unknown>;
}
