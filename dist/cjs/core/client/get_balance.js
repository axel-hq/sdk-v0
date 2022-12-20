"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe_get_balance = exports.get_balance = exports.internal_get_balance_request = exports.promote_request = void 0;
const sup = require("../sup");
const net_1 = require("../net");
const err_1 = require("../err");
const util_1 = require("../providers/util");
const address_1 = require("../address");
const hex_string_1 = require("../hex_string");
const EIP_1193_1 = require("../providers/EIP_1193");
const chains_1 = require("../chains");
const tokens_1 = require("../tokens");
const two_1 = require("./two");
function assert_request(u) {
    sup.assert_object.assert(u);
    sup.object_optional_t("chain", chains_1.assert_chain, u);
    sup.object_optional_t("token", tokens_1.assert_token, u);
    sup.object_optional_t("wallet_address", address_1.assert_address, u);
    void null;
}
async function promote_request(client, req) {
    var _a, _b, _c;
    const client_chain = (_a = req.chain) !== null && _a !== void 0 ? _a : await client.get_chain();
    const chain = (0, chains_1.server_sees)(client_chain);
    const token = (_b = req.token) !== null && _b !== void 0 ? _b : tokens_1.internet_to_native_token[chain];
    const wallet_address = (_c = req.wallet_address) !== null && _c !== void 0 ? _c : await client.get_account();
    // maybe some kind of get_non_null_active_selected account to abstract
    // over this error in the future
    if (wallet_address === null) {
        throw new err_1.AxelTypeError([
            "You did not supply a wallet_address and the sdk could not infer one.",
            "Have you called AxelClientInstance#connect_provider?",
        ]);
    }
    return { client_chain, chain, token, wallet_address };
}
exports.promote_request = promote_request;
function assert_response(res) {
    sup.object_has_t("rpc_requests", sup.assert_array_singleton_t(EIP_1193_1.assert_RequestArguments), res);
    sup.object_has_t("decimals", sup.assert_uint, res);
    sup.object_has_v("status", "success", res);
    void null;
}
async function internal_get_balance_request(client, opts) {
    // NOTE(Cole): this is somewhat inconsistent, would be nice to have the whole
    // client_chain and chain dance again.
    const res = await (0, net_1.post)("balance", client.api_key, {
        wallet_address: opts.wallet_address,
        chain: opts.chain,
        token: opts.token,
    });
    assert_response(res);
    return {
        rpc_request: res.rpc_requests[0],
        decimals: res.decimals,
    };
}
exports.internal_get_balance_request = internal_get_balance_request;
async function internal_get_balance(client, opts) {
    const req = await internal_get_balance_request(client, opts);
    const provider_response = await (0, two_1.send_to_provider)(client, opts.client_chain, req.rpc_request);
    const amount = (0, hex_string_1.hex_string_to_ufloat)(provider_response, req.decimals);
    return amount;
}
function get_balance(opts) {
    (0, util_1.check_provider)(this);
    return internal_get_balance(this, opts);
}
exports.get_balance = get_balance;
async function safe_get_balance(opts = {}) {
    (0, util_1.check_provider)(this);
    assert_request(opts);
    const full = await promote_request(this, opts);
    return internal_get_balance(this, full);
}
exports.safe_get_balance = safe_get_balance;
