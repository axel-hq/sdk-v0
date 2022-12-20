import * as sup from "../sup";
import { AxelCoreClient } from "../client";
import { apy_info, apy_type } from "../apy";
import { protocols_of } from "../protocols";
import { chain, internet } from "../chains";
import { token } from "../tokens";
type full_apy_req = {
    protocol: protocols_of<apy_info[apy_type]>;
    chain: internet;
    client_chain: chain;
    token: token;
};
type partial_apy_req = {
    protocol: protocols_of<apy_info[apy_type]>;
    chain?: chain;
    token?: token;
};
export declare function assert_request(type: apy_type, u: unknown): asserts u is partial_apy_req;
export declare function get_apy(this: AxelCoreClient, type: apy_type, opts: full_apy_req): Promise<sup.ufloat>;
export declare function safe_get_apy(this: AxelCoreClient, type: apy_type, opts: partial_apy_req): Promise<sup.ufloat>;
export {};
