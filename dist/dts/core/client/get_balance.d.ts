import * as sup from "../sup";
import { AxelCoreClient } from "../client";
import { good_provider } from "../providers/util";
import { address } from "../address";
import { RequestArguments } from "../providers/EIP_1193";
import { chain, internet } from "../chains";
import { token } from "../tokens";
type full_balance_request = {
    client_chain: chain;
    chain: internet;
    token: token;
    wallet_address: address;
};
type partial_balance_request = {
    chain?: chain;
    token?: token;
    wallet_address?: address;
};
export declare function promote_request(client: AxelCoreClient & good_provider, req: partial_balance_request): Promise<full_balance_request>;
export declare function internal_get_balance_request(client: AxelCoreClient & good_provider, opts: full_balance_request): Promise<{
    rpc_request: RequestArguments;
    decimals: sup.uint;
}>;
export declare function get_balance(this: AxelCoreClient, opts: full_balance_request): Promise<sup.ufloat>;
export declare function safe_get_balance(this: AxelCoreClient, opts?: unknown): Promise<sup.ufloat>;
export {};
