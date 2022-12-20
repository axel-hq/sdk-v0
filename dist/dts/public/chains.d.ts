import type { unwrap } from "./sup";
import type { hex_string } from "./hex_string";
export type { mainnet, testnet, internet, } from "../core/chains";
import type { internet, chain as chain_nt, externet as externet_nt, chain_id as chain_id_nt } from "../core/chains";
export type externet = string;
export type chain = string;
export type chain_id = `0x${string}`;
export type new_externet = {
    name: string;
    chain_id: hex_string;
    forking: internet;
};
export { mainnets, testnets, internets, } from "../core/chains";
export declare const externets: readonly externet[];
export declare const add_externet: {
    (new_externet: new_externet): void;
};
