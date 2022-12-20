import * as sup from "../sup";
import { AxelCoreClient } from "../client";
import { EIP_1193_Provider } from "./EIP_1193";
import { address } from "../address";
import { hex_string } from "../hex_string";
import { chain } from "../chains";
export type good_provider = {
    provider: EIP_1193_Provider;
};
export type bad_provider = {
    provider: null;
};
export type unknown_provider = good_provider | bad_provider;
export declare function check_provider(client: AxelCoreClient): asserts client is typeof client & good_provider;
export declare const assert_accounts: sup.assert_obj<address[]>;
declare function get_accounts(this: AxelCoreClient & bad_provider): Promise<[]>;
declare function get_accounts(this: AxelCoreClient): Promise<address[]>;
export { get_accounts };
declare function get_account(this: AxelCoreClient & bad_provider): Promise<null>;
declare function get_account(this: AxelCoreClient): Promise<address | null>;
export { get_account };
/**
 * @throws if the result of eth_chainId was not a hex_string
 * @returns null if this.provider is null
 * @returns hex_string if all good
 */
declare function get_chain_id(this: AxelCoreClient & bad_provider): Promise<null>;
declare function get_chain_id(this: AxelCoreClient & good_provider): Promise<hex_string>;
declare function get_chain_id(this: AxelCoreClient): Promise<hex_string | null>;
export { get_chain_id };
/**
 * @throws if the hex_string was not a known chain_id
 * @returns null if this.provider is null
 * @returns chain if all good
 */
declare function get_chain(this: AxelCoreClient & bad_provider): Promise<null>;
declare function get_chain(this: AxelCoreClient & good_provider): Promise<chain>;
declare function get_chain(this: AxelCoreClient): Promise<chain | null>;
export { get_chain };
