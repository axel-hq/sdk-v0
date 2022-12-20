"use strict";
// Token Write Operation (two)
// General functions for reducing code duplication.
Object.defineProperty(exports, "__esModule", { value: true });
exports.send_to_provider = exports.check_protocol = void 0;
// NOTE(Cole):
// Why is `this` passed in explicitly? These functions don't really belong to
// the AxelCoreClient instance itself. They belong to client specific code, and as
// such, they should be thought of as macros.
const foundatsion_1 = require("@axel-hq/foundatsion");
const sup = require("../sup");
const err_1 = require("../err");
const chains_1 = require("../chains");
const hex_string_1 = require("../hex_string");
const protocols_1 = require("../protocols");
const transaction_looker_1 = require("../lookers/transaction_looker");
function check_protocol(protocol, chain, internet, what) {
    if (chains_1.chain_info[chain].type === "externet") {
        if ((0, protocols_1.protocol_supports_chain)(protocol, internet)) { }
        else {
            throw new err_1.AxelError([
                `Tried to ${what} but protocol ${sup.dbg_str(protocol)} does not support`,
                `chain ${sup.dbg_str(chain)} because it does not support it's parent chain ${sup.dbg_str(internet)}.`,
            ]);
        }
    }
    else {
        // already an internet in which case chain === internet
        if (chain !== internet) {
            throw new err_1.AxelError([
                "Logic Error: src/core/client::check_protocol",
                "Please repor this to the Axel developers immediately.",
            ]);
        }
        if ((0, protocols_1.protocol_supports_chain)(protocol, internet)) { }
        else {
            throw new err_1.AxelError([
                `Tried to ${what} but protocol ${sup.dbg_str(protocol)}`,
                `does not support chain ${sup.dbg_str(internet)}`,
            ]);
        }
    }
}
exports.check_protocol = check_protocol;
async function send_to_provider(client, wanted_chain, provider_rpc_request) {
    const wanted_chain_id = chains_1.chain_info[wanted_chain].chain_id;
    const current_chain_id = await client.get_chain_id();
    if (wanted_chain_id !== current_chain_id) {
        try {
            await client.provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: wanted_chain_id }],
            });
        }
        catch (e) {
            if (e instanceof Error) {
                throw new foundatsion_1.F.Error("User did not want to switch chains!\n", `Tried switching to "${wanted_chain_id}"`, `from "${current_chain_id}" but got the following error:`, e);
            }
            throw e;
        }
    }
    // horrible hack to deal with the nonce
    // so this should fucking work but metamask overrides our nonce value with
    // it's shitty one and makes the transaction fail lol.
    // if (provider_rpc_request.method === "eth_sendTransaction") {
    //    const args: readonly any[] = sup.UNSOUND_shut_up(provider_rpc_request.params);
    //    const hex_nonce = await client.provider.request({
    //       method: "eth_getTransactionCount",
    //       params: [await client.get_account(), "latest"],
    //    });
    //    // oh yeah if this is zero, tough shit
    //    args[0].nonce = hex_nonce;
    // }
    const hash = await client.provider.request(provider_rpc_request);
    hex_string_1.assert_hex_string.assert(hash);
    if (provider_rpc_request.method === "eth_sendTransaction") {
        const l = new transaction_looker_1.transaction_looker(client, hash);
        const x = await l.wait();
        return hash;
    }
    else {
        return hash;
    }
}
exports.send_to_provider = send_to_provider;
