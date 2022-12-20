import * as sup from "../sup";
import { AxelCoreClient } from "../client";
import { good_provider } from "../providers/util";
import { gas_priority } from "../gas_priority";
import { chain, internet } from "../chains";
type full_gas_price_request = {
    gas_priority: gas_priority;
    client_chain: chain;
    chain: internet;
};
type partial_gas_price_request = {
    gas_priority: number;
    chain?: chain;
};
export declare function promote_request(client: AxelCoreClient & good_provider, req: partial_gas_price_request): Promise<full_gas_price_request>;
export declare function get_gas_price(this: AxelCoreClient, opts: full_gas_price_request): Promise<sup.ufloat>;
export declare function safe_get_gas_price(this: AxelCoreClient, opts?: unknown): Promise<sup.ufloat>;
export {};
