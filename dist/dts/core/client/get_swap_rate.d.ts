import * as sup from "../sup";
import { AxelCoreClient } from "../client";
import { good_provider } from "../providers/util";
import { chain, internet } from "../chains";
import { token } from "../tokens";
import { max_slippage_percent } from "../max_slippage_percent";
type full_swap_rate_request = {
    client_chain: chain;
    chain: internet;
    sell_token: token;
    buy_token: token;
    max_slippage_percent: max_slippage_percent;
};
type partial_swap_rate_request = {
    chain?: chain;
    sell_token: token;
    buy_token: token;
    max_slippage_percent?: max_slippage_percent;
};
export declare function promote_request(client: AxelCoreClient & good_provider, req: partial_swap_rate_request): Promise<full_swap_rate_request>;
export declare function get_swap_rate(this: AxelCoreClient, opts: full_swap_rate_request): Promise<sup.ufloat>;
export declare function safe_get_swap_rate(this: AxelCoreClient, opts?: unknown): Promise<sup.ufloat>;
export {};
