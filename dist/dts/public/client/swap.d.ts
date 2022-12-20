import type { address } from "../address";
import type { any_token } from "../tokens";
import type { hex_string } from "../hex_string";
import type { ufloat, uint } from "../sup";
import type { gas_priority } from "../gas_priority";
import type { chain, internet } from "../chains";
import type { AxelClientInstance } from "../client";
import type { swapping_protocol } from "../protocols";
import { max_slippage_percent } from "../max_slippage_percent";
export type full_swap_request = {
    sell_amount: ufloat;
    sell_token: any_token;
    buy_token: any_token;
    protocol: swapping_protocol;
    client_chain: chain;
    chain: internet;
    wallet_address: address;
    max_slippage_percent: max_slippage_percent;
    gas_priority: gas_priority;
    minutes_timeout: uint;
};
export type partial_swap_request = {
    sell_amount: ufloat;
    sell_token: any_token;
    buy_token: any_token;
    protocol?: swapping_protocol;
    chain?: chain;
    wallet_address?: address;
    max_slippage_percent?: max_slippage_percent;
    gas_priority?: gas_priority;
    minutes_timeout?: uint;
};
export type swap = {
    (this: AxelClientInstance, opts: full_swap_request): Promise<hex_string>;
};
export type safe_swap = {
    (this: AxelClientInstance, opts: partial_swap_request): Promise<hex_string>;
};
