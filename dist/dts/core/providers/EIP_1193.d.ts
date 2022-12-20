import * as sup from "../sup";
import { hex_string } from "../hex_string";
export interface RequestArguments {
    readonly method: string;
    readonly params?: readonly unknown[] | object;
}
export declare const assert_RequestArguments: sup.assert_obj<RequestArguments>;
export interface ProviderConnectInfo {
    readonly chainId: hex_string;
}
export declare const assert_ProviderConnectInfo: sup.assert_obj<ProviderConnectInfo>;
/**
 * Metamask does not conform to the spec.
 * Data should not be optional...
 */
export interface ProviderRpcError extends Error {
    code: number;
    data?: unknown;
}
export declare const assert_ProviderRpcError: sup.assert_obj<ProviderRpcError>;
export type ProviderEventName = "connect" | "disconnect" | "chainChanged" | "accountsChanged";
export interface EIP_1193_Provider {
    isMetaMask?: boolean;
    isCoinbaseWallet?: boolean;
    on(event_name: ProviderEventName, fn: sup.any_fn): void;
    removeListener(event_name: ProviderEventName, fn: sup.any_fn): boolean;
    request(args: RequestArguments): Promise<unknown>;
}
export declare const assert_EIP_1193_Provider: sup.assert_obj<EIP_1193_Provider>;
