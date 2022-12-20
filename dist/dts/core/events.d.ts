import * as sup from "./sup";
import * as EIP_1193 from "./providers/EIP_1193";
import { address } from "./address";
import { hex_string } from "./hex_string";
import { AxelCoreClient } from "./client";
import { chain, chain_id } from "./chains";
export declare const event_names: readonly ["provider_connect", "provider_disconnect", "accounts_update", "chain_update"];
export type event_name = typeof event_names[number];
export declare const assert_event_name: sup.assert_obj<event_name>;
export type event_error = {
    status: "error";
    error: Error;
};
type accounts_update_ok = {
    status: "ok";
    accounts: address[];
};
export type accounts_update = accounts_update_ok | event_error;
type chain_update_unknown = {
    status: "unknown";
    chain: null;
    chain_id: hex_string;
};
type chain_update_known = {
    status: "known";
    chain: chain;
    chain_id: chain_id;
};
export type chain_update = chain_update_unknown | chain_update_known | event_error;
/** provider connect listener also triggers chain_change_listener */
export type provider_connect_listener = {
    (): void;
};
export type provider_disconnect_listener = {
    (err: EIP_1193.ProviderRpcError): void;
};
export type accounts_update_listener = {
    (update: accounts_update): void;
};
export type chain_update_listener = {
    (update: chain_update): void;
};
export type dynamic_listener = {
    provider_connect: provider_connect_listener;
    provider_disconnect: provider_disconnect_listener;
    accounts_update: accounts_update_listener;
    chain_update: chain_update_listener;
};
export type dynamic_params = {
    [listener in event_name]: Parameters<dynamic_listener[listener]>[0];
};
export type listener_object = {
    [name in event_name]: dynamic_listener[name][];
};
export type on = {
    (this: AxelCoreClient, name: unknown, listener: unknown): void;
};
export type off = {
    (this: AxelCoreClient, name: unknown, listener: unknown): boolean;
};
export type connect_provider = {
    (this: AxelCoreClient, ethereum: unknown): Promise<void>;
};
export {};
