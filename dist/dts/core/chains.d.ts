import * as sup from "./sup";
import { hex_string } from "./hex_string";
export declare const mainnets: readonly ["ethereum"];
export type mainnet = typeof mainnets[number];
export declare const assert_mainnet: sup.assert_obj<mainnet>;
export declare const testnets: readonly ["kovan", "rinkeby", "ropsten", "goerli"];
export type testnet = typeof testnets[number];
export declare const assert_testnet: sup.assert_obj<testnet>;
export declare const internets: readonly ["ethereum", "kovan", "rinkeby", "ropsten", "goerli"];
export type internet = mainnet | testnet;
export declare const assert_internet: sup.assert_obj<internet>;
export declare function is_internet(u: unknown): u is internet;
export declare const externets: externet[];
export type externet = sup.newtype<"externet", string & sup.no_collapse>;
export declare const assert_externet: sup.assert_obj<externet>;
export declare function is_externet(u: unknown): u is externet;
export type chain = internet | externet;
export declare const assert_chain: sup.assert_obj<chain>;
export declare function is_chain(u: unknown): u is chain;
export type chain_id = sup.newtype<"chain_id", hex_string>;
export declare function is_chain_id(h: hex_string): h is chain_id;
export declare const assert_chain_id: sup.assert_obj<chain_id>;
export declare function chain_id_to_chain(chain_id: chain_id): chain;
type mainnet_info = {
    readonly type: "mainnet";
    readonly chain_id: chain_id;
};
type testnet_info = {
    readonly type: "testnet";
    readonly chain_id: chain_id;
    readonly mainnet: mainnet;
};
type externet_info = {
    readonly type: "externet";
    readonly chain_id: chain_id;
    readonly forking: internet;
};
export declare const chain_info: {
    [chain in mainnet]: mainnet_info;
} & {
    [chain in testnet]: testnet_info;
} & {
    [chain in externet]: externet_info;
};
export declare function add_externet(u: unknown): void;
export declare function server_sees(chain: chain): internet;
export {};
