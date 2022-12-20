import * as sup from "./sup";
import { internet } from "./chains";
import { action_class } from "./actions";
export declare const protocols_info: {
    readonly auto: {
        readonly action_class: readonly ["swapping"];
        readonly supported_chains: readonly ["ethereum"];
    };
    readonly aave: {
        readonly action_class: readonly ["lending"];
        readonly supported_chains: readonly ["ethereum"];
    };
    readonly compound: {
        readonly action_class: readonly ["lending"];
        readonly supported_chains: readonly ["ethereum"];
    };
    readonly lido: {
        readonly action_class: readonly ["staking"];
        readonly supported_chains: readonly ["ethereum"];
    };
    readonly rocketpool: {
        readonly action_class: readonly ["staking"];
        readonly supported_chains: readonly ["ethereum"];
    };
    readonly sushiswap: {
        readonly action_class: readonly ["swapping"];
        readonly supported_chains: readonly ["ethereum"];
    };
    readonly uniswap: {
        readonly action_class: readonly ["swapping"];
        readonly supported_chains: readonly ["ethereum"];
    };
    readonly yearn: {
        readonly action_class: readonly ["yielding"];
        readonly supported_chains: readonly ["ethereum"];
    };
};
type pcols_info_t = typeof protocols_info;
export type protocols_of<cls extends action_class> = {
    [key in keyof pcols_info_t]: cls extends pcols_info_t[key]["action_class"][number] ? key : never;
}[keyof pcols_info_t];
export type protocol = keyof pcols_info_t;
export declare const assert_protocol: sup.assert_obj<protocol>;
export declare function protocol_supports_chain(pcol: protocol, chain: internet): boolean;
export declare function safe_protocol_supports_chain(__pcol: unknown, __chain: unknown): boolean;
export type lending_protocol = protocols_of<"lending">;
export declare const assert_lending_protocol: sup.assert_obj<lending_protocol>;
export type staking_protocol = protocols_of<"staking">;
export declare const assert_staking_protocol: sup.assert_obj<staking_protocol>;
export type yielding_protocol = protocols_of<"yielding">;
export declare const assert_yielding_protocol: sup.assert_obj<yielding_protocol>;
export type swapping_protocol = protocols_of<"swapping">;
export declare const assert_swapping_protocol: sup.assert_obj<swapping_protocol>;
export type dynamic_protocol_assert<cls extends action_class> = sup.assert_obj<protocols_of<cls>>;
export declare const dynamic_protocol_assert: {
    [cls in action_class]: dynamic_protocol_assert<cls>;
};
export type filter_pcols_by = {
    chain?: internet;
    action_class?: action_class;
};
export declare function safe_filter_by(u: unknown): protocol[];
export {};
