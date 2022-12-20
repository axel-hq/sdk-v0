import type { chain } from "../chains";
import type { address } from "../address";
import type { hex_string } from "../hex_string";
import type { AxelClientInstance } from "../client";
export type get_accounts = {
    (this: AxelClientInstance): Promise<address[]>;
};
export type get_account = {
    (this: AxelClientInstance): Promise<address | null>;
};
/**
 * @throws if the result of eth_chainId was not a hex_string
 * @returns null if this.provider is null
 * @returns hex_string if all good
 */
export type get_chain_id = {
    (this: AxelClientInstance): Promise<hex_string | null>;
};
/**
 * @throws if the hex_string was not a known chain_id
 * @returns null if this.provider is null
 * @returns chain if all good
 */
export type get_chain = {
    (this: AxelClientInstance): Promise<chain | null>;
};
