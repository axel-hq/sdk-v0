import type { address } from "../address";
import type { protocol } from "../protocols";
import type { any_token } from "../tokens";
import type { ufloat, uint } from "../sup";
import type { gas_priority } from "../gas_priority";
import type { chain, internet } from "../chains";
export type two1_req_partial<pcols extends protocol = protocol> = {
    amount: ufloat;
    protocol: pcols;
    chain?: chain;
    token?: any_token;
    wallet_address?: address;
    gas_priority?: gas_priority;
    minutes_timeout?: uint;
};
export type two1_req_full<pcols extends protocol = protocol> = {
    amount: ufloat;
    protocol: pcols;
    client_chain: chain;
    chain: internet;
    token: any_token;
    wallet_address: address;
    gas_priority: gas_priority;
    minutes_timeout: uint;
};
