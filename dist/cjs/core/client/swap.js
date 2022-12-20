"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe_swap = exports.swap = void 0;
const sup = require("../sup");
const err_1 = require("../err");
const util_1 = require("../providers/util");
const tokens_1 = require("../tokens");
const address_1 = require("../address");
const defaults_1 = require("../defaults");
const net_1 = require("../net");
const two_1 = require("./two");
const EIP_1193_1 = require("../providers/EIP_1193");
const chains_1 = require("../chains");
const protocols_1 = require("../protocols");
const gas_priority_1 = require("../gas_priority");
const max_slippage_percent_1 = require("../max_slippage_percent");
function assert_request(u) {
    sup.assert_object.assert(u);
    sup.object_has_t("sell_amount", sup.assert_ufloat, u);
    sup.object_has_t("sell_token", tokens_1.assert_token, u);
    sup.object_has_t("buy_token", tokens_1.assert_token, u);
    sup.object_optional_t("protocol", protocols_1.assert_swapping_protocol, u);
    sup.object_optional_t("chain", chains_1.assert_chain, u);
    sup.object_optional_t("wallet_address", address_1.assert_address, u);
    sup.object_optional_t("max_slippage_percent", max_slippage_percent_1.assert_max_slippage_percent, u);
    sup.object_optional_t("gas_priority", gas_priority_1.assert_gas_priority, u);
    sup.object_optional_t("minutes_timeout", sup.assert_uint, u);
    void null;
}
async function promote_request(client, r) {
    var _a, _b, _c, _d, _e, _f;
    const sell_amount = r.sell_amount;
    const sell_token = r.sell_token;
    const buy_token = r.buy_token;
    const protocol = (_a = r.protocol) !== null && _a !== void 0 ? _a : "auto";
    const client_chain = (_b = r.chain) !== null && _b !== void 0 ? _b : await client.get_chain();
    const chain = (0, chains_1.server_sees)(client_chain);
    const wallet_address = (_c = r.wallet_address) !== null && _c !== void 0 ? _c : await client.get_account();
    // NOTE(Cole): this process of checking if the wallet is not null has already
    // been factored out and just needs to be substituted in here.
    if (wallet_address === null) {
        throw new err_1.AxelTypeError([
            "You did not supply a wallet_address and the sdk could not infer one.",
            "Have you called AxelClientInstance#connect_provider?",
        ]);
    }
    const max_slippage_percent = (_d = r.max_slippage_percent) !== null && _d !== void 0 ? _d : defaults_1.default_max_slippage_percent;
    const gas_priority = (_e = r.gas_priority) !== null && _e !== void 0 ? _e : gas_priority_1.gas_priorities.medium;
    const minutes_timeout = (_f = r.minutes_timeout) !== null && _f !== void 0 ? _f : defaults_1.default_minutes_timeout;
    return {
        sell_amount, sell_token, buy_token, protocol,
        client_chain, chain, wallet_address,
        max_slippage_percent,
        gas_priority, minutes_timeout,
    };
}
function assert_response(res) {
    sup.object_has_t("rpc_requests", sup.assert_array_t(EIP_1193_1.assert_RequestArguments), res);
    void null;
}
async function internal_swap(client, opts) {
    (0, two_1.check_protocol)(opts.protocol, opts.client_chain, opts.chain, "swapping");
    const prior_rpc_responses = [];
    while (true) {
        const res = await (0, net_1.post)("swap", client.api_key, {
            ...opts,
            prior_rpc_responses,
        });
        assert_response(res);
        const provider_responses = [];
        for (const rpc_request of res.rpc_requests) {
            const provider_response = await (0, two_1.send_to_provider)(client, opts.client_chain, rpc_request);
            provider_responses.push(provider_response);
        }
        prior_rpc_responses.push(provider_responses);
        if (res.status === "continue") {
            continue;
        }
        break;
    }
    const flattened = [];
    for (const prior of prior_rpc_responses) {
        flattened.push(...prior);
    }
    return flattened;
}
function swap(opts) {
    (0, util_1.check_provider)(this);
    return internal_swap(this, opts);
}
exports.swap = swap;
async function safe_swap(opts) {
    (0, util_1.check_provider)(this);
    assert_request(opts);
    const full_request = await promote_request(this, opts);
    return internal_swap(this, full_request);
}
exports.safe_swap = safe_swap;
