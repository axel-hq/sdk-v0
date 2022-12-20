import type { ufloat } from "../sup";
import type { address } from "../address";
import type { any_token } from "../tokens";
import type { chain, internet } from "../chains";
import type { AxelClientInstance } from "../client";
export type full_balance_request = {
    client_chain: chain;
    chain: internet;
    token: any_token;
    wallet_address: address;
};
export type partial_balance_request = {
    chain?: chain;
    token?: any_token;
    wallet_address?: address;
};
export type get_balance = {
    (this: AxelClientInstance, opts: full_balance_request): Promise<ufloat>;
};
export type safe_get_balance = {
    (this: AxelClientInstance, opts?: partial_balance_request): Promise<ufloat>;
};
