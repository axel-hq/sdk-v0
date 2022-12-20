import * as sup from "../sup";
import { protocol } from "../protocols";
import { hex_string } from "../hex_string";
import { good_provider } from "../providers/util";
import { AxelCoreClient } from "../client";
import { address } from "../address";
import { gas_priority } from "../gas_priority";
import { RequestArguments } from "../providers/EIP_1193";
import { chain, internet } from "../chains";
import { token } from "../tokens";
export type two1_req_partial<pcols extends protocol = protocol> = {
    amount: sup.ufloat;
    protocol: pcols;
    chain?: chain;
    token?: token;
    wallet_address?: address;
    gas_priority?: gas_priority;
    minutes_timeout?: sup.uint;
};
export type two1_req_full<pcols extends protocol = protocol> = {
    amount: sup.ufloat;
    protocol: pcols;
    client_chain: chain;
    chain: internet;
    token: token;
    wallet_address: address;
    gas_priority: gas_priority;
    minutes_timeout: sup.uint;
};
export declare function assert_request<protocol_type extends protocol>(u: unknown, assert: sup.assert_obj<protocol_type>): asserts u is two1_req_partial<protocol_type>;
export declare function promote_request<protocol_type extends protocol>(client: AxelCoreClient & good_provider, r: two1_req_partial<protocol_type>): Promise<two1_req_full<protocol_type>>;
export type basic_response = {
    status: "success" | "continue";
    rpc_requests: RequestArguments[];
};
export declare function two1_run(client: AxelCoreClient & good_provider, action: string, opts: two1_req_full): Promise<hex_string[]>;
