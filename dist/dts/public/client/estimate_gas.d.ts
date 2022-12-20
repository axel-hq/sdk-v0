import type { chain } from "../chains";
import type { hex_string } from "../hex_string";
import type { AxelClientInstance } from "../client";
export type estimate_gas = {
    (this: AxelClientInstance, chain: chain): Promise<hex_string[]>;
};
export type safe_estimate_gas = {
    (this: AxelClientInstance, chain?: chain): Promise<hex_string[]>;
};
