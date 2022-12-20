export type { event_name } from "../core/events";
import type * as EIP_1193 from "./providers/EIP_1193";
import type { address } from "./address";
import type { event_name } from "./events";
import type { hex_string } from "./hex_string";
import type { chain, chain_id } from "./chains";
import type { AxelClientInstance } from "./client";
export type event_error = {
    status: "error";
    error: Error;
};
export type accounts_update_ok = {
    status: "ok";
    accounts: address[];
};
export type accounts_update = accounts_update_ok | event_error;
export type chain_update_unknown = {
    status: "unknown";
    chain: null;
    chain_id: hex_string;
};
export type chain_update_known = {
    status: "known";
    chain: chain;
    chain_id: chain_id;
};
export type chain_update = chain_update_unknown | chain_update_known | event_error;
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
export type on = {
    <name extends event_name>(this: AxelClientInstance, name: name, listener: dynamic_listener[name]): void;
};
export type off = {
    <name extends event_name>(this: AxelClientInstance, name: name, listener: dynamic_listener[name]): boolean;
};
export { event_names as names } from "../core/events";
