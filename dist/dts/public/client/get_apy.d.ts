import type { ufloat } from "../sup";
import type { internet } from "../chains";
import type { any_token } from "../tokens";
import type { protocols_of } from "../protocols";
import type { apy_type, apy_info } from "../apy";
import type { AxelClientInstance } from "../client";
export type full_apy_req<type extends apy_type = apy_type> = {
    protocol: protocols_of<apy_info[type]>;
    chain: internet;
    token: any_token;
};
export type partial_apy_req<type extends apy_type = apy_type> = {
    protocol: protocols_of<apy_info[type]>;
    chain?: internet;
    token?: any_token;
};
export type get_apy = {
    <type extends apy_type>(this: AxelClientInstance, type: apy_type, opts: full_apy_req<type>): Promise<ufloat>;
};
export type safe_get_apy = {
    <type extends apy_type>(this: AxelClientInstance, type: type, opts: partial_apy_req<type>): Promise<ufloat>;
};
