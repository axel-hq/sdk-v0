"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_chain = exports.get_chain_id = exports.get_account = exports.get_accounts = exports.assert_accounts = exports.check_provider = void 0;
const sup = require("../sup");
const err_1 = require("../err");
const address_1 = require("../address");
const hex_string_1 = require("../hex_string");
const chains_1 = require("../chains");
function check_provider(client) {
    if (client.provider === null) {
        throw new err_1.AxelError([
            "You are not connected to a provider.",
            "Have you done AxelClientInstance#connect_provider?",
        ]);
    }
}
exports.check_provider = check_provider;
exports.assert_accounts = sup.assert_array_t(address_1.assert_address);
async function get_accounts() {
    if (this.provider === null)
        return [];
    const maybe = await this.provider.request({ method: "eth_accounts" });
    exports.assert_accounts.assert(maybe);
    return maybe;
}
exports.get_accounts = get_accounts;
async function get_account() {
    const accounts = await this.get_accounts();
    if (accounts.length === 0) {
        return null;
    }
    else {
        return accounts[0];
    }
}
exports.get_account = get_account;
async function get_chain_id() {
    if (this.provider === null) {
        return null;
    }
    const chain_id = await this.provider.request({ method: "eth_chainId" });
    try {
        hex_string_1.assert_hex_string.assert(chain_id);
    }
    catch (e) {
        if (e instanceof err_1.AxelTypeError) {
            throw new err_1.AxelTypeError([
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
exports.get_chain_id = get_chain_id;
async function get_chain() {
    const chain_id = await this.get_chain_id();
    if (chain_id === null) {
        return null;
    }
    try {
        chains_1.assert_chain_id.assert(chain_id);
    }
    catch (e) {
        if (e instanceof err_1.AxelTypeError) {
            throw new err_1.AxelTypeError([
                "You are on an unknown chain!",
                `chain_id = "${chain_id}"`,
                e,
            ]);
        }
        else {
            throw e;
        }
    }
    return (0, chains_1.chain_id_to_chain)(chain_id);
}
exports.get_chain = get_chain;
