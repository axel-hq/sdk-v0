import * as sup from "../sup";
import { AxelError, AxelTypeError } from "../err";
import { assert_address } from "../address";
import { assert_hex_string } from "../hex_string";
import { assert_chain_id, chain_id_to_chain } from "../chains";
export function check_provider(client) {
    if (client.provider === null) {
        throw new AxelError([
            "You are not connected to a provider.",
            "Have you done AxelClientInstance#connect_provider?",
        ]);
    }
}
export const assert_accounts = sup.assert_array_t(assert_address);
async function get_accounts() {
    if (this.provider === null)
        return [];
    const maybe = await this.provider.request({ method: "eth_accounts" });
    assert_accounts.assert(maybe);
    return maybe;
}
export { get_accounts };
async function get_account() {
    const accounts = await this.get_accounts();
    if (accounts.length === 0) {
        return null;
    }
    else {
        return accounts[0];
    }
}
export { get_account };
async function get_chain_id() {
    if (this.provider === null) {
        return null;
    }
    const chain_id = await this.provider.request({ method: "eth_chainId" });
    try {
        assert_hex_string.assert(chain_id);
    }
    catch (e) {
        if (e instanceof AxelTypeError) {
            throw new AxelTypeError([
                "eth_chainId returned something that did not satisfy hex_string!",
                e,
            ]);
        }
        else {
            throw e;
        }
    }
    return chain_id;
}
export { get_chain_id };
async function get_chain() {
    const chain_id = await this.get_chain_id();
    if (chain_id === null) {
        return null;
    }
    try {
        assert_chain_id.assert(chain_id);
    }
    catch (e) {
        if (e instanceof AxelTypeError) {
            throw new AxelTypeError([
                "You are on an unknown chain!",
                `chain_id = "${chain_id}"`,
                e,
            ]);
        }
        else {
            throw e;
        }
    }
    return chain_id_to_chain(chain_id);
}
export { get_chain };
