import type { ufloat } from "../sup";
import type { chain, internet } from "../chains";
import type { AxelClientInstance } from "../client";
import { gas_priority } from "../gas_priority";
type full_gas_price_request = {
    gas_priority: gas_priority;
    client_chain: chain;
    chain: internet;
};
type partial_gas_price_request = {
    gas_priority: number;
    chain?: chain;
};
export type get_gas_price = {
    (this: AxelClientInstance, opts: full_gas_price_request): Promise<ufloat>;
};
export type safe_get_gas_price = {
    (this: AxelClientInstance, opts?: partial_gas_price_request): Promise<ufloat>;
};
export {};
