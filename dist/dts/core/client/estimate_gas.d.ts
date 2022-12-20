import { chain } from "../chains";
import { hex_string } from "../hex_string";
import { AxelCoreClient } from "../client";
export declare function estimate_gas(this: AxelCoreClient, chain: chain): Promise<hex_string>;
export declare function safe_estimate_gas(this: AxelCoreClient, __chain?: unknown): Promise<hex_string>;
