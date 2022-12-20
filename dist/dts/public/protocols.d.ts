export type { protocol, filter_pcols_by as protocol_filter, protocols_of, lending_protocol, staking_protocol, yielding_protocol, swapping_protocol, } from "../core/protocols";
import type { action_class } from "./actions";
import type { chain, internet } from "./chains";
import type { protocol, protocol_filter } from "./protocols";
export type protocol_info = {
    readonly action_class: readonly action_class[];
    readonly supported_chains: readonly chain[];
};
export { protocols_info as info } from "../core/protocols";
export declare const supports_chain: {
    (protocol: protocol, chain: internet): boolean;
};
export declare const filter_by: {
    (filter?: protocol_filter): protocol[];
};
