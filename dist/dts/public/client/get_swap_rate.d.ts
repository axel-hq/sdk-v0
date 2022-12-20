import type { ufloat } from "../sup";
import type { any_token } from "../tokens";
import type { chain, internet } from "../chains";
import type { AxelClientInstance } from "../client";
import { max_slippage_percent } from "../max_slippage_percent";
export type full_swap_rate_request = {
    client_chain: chain;
    chain: internet;
    sell_token: any_token;
    buy_token: any_token;
    max_slippage_percent: max_slippage_percent;
};
export type partial_swap_rate_request = {
    chain?: chain;
    sell_token: any_token;
    buy_token: any_token;
    max_slippage_percent?: max_slippage_percent;
};
export type get_swap_rate = {
    (this: AxelClientInstance, opts: full_swap_rate_request): Promise<ufloat>;
};
export type safe_get_swap_rate = {
    (this: AxelClientInstance, opts?: partial_swap_rate_request): Promise<ufloat>;
};
