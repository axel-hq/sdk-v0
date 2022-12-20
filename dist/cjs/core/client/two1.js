"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.two1_run = exports.promote_request = exports.assert_request = void 0;
// Mono Token Write Operation (two1)
// Most write endpoints have a pretty similar structure to the parameters the
// server expects to receive. The only differing request type is the protocol.
// Certain requests use different protocol action-classes, so to speak.
// Compound is a lending protocol but not an swapping protocol.
const sup = require("../sup");
const net_1 = require("../net");
const err_1 = require("../err");
const address_1 = require("../address");
const two_1 = require("./two");
const gas_priority_1 = require("../gas_priority");
const EIP_1193_1 = require("../providers/EIP_1193");
const chains_1 = require("../chains");
const tokens_1 = require("../tokens");
const defaults_1 = require("../defaults");
function assert_request(u, assert) {
    sup.assert_object.assert(u);
    sup.object_has_t("amount", sup.assert_ufloat, u);
    sup.object_has_t("protocol", assert, u);
    sup.object_optional_t("chain", chains_1.assert_chain, u);
    sup.object_optional_t("token", tokens_1.assert_token, u);
    sup.object_optional_t("wallet_address", address_1.assert_address, u);
    sup.object_optional_t("gas_priority", gas_priority_1.assert_gas_priority, u);
    sup.object_optional_t("minutes_timeout", sup.assert_uint, u);
    void null;
}
exports.assert_request = assert_request;
async function promote_request(client, r) {
    var _a, _b, _c, _d, _e;
    const amount = r.amount;
    const protocol = r.protocol;
    const client_chain = (_a = r.chain) !== null && _a !== void 0 ? _a : await client.get_chain();
    const chain = (0, chains_1.server_sees)(client_chain);
    const token = (_b = r.token) !== null && _b !== void 0 ? _b : tokens_1.internet_to_native_token[chain];
    const wallet_address = (_c = r.wallet_address) !== null && _c !== void 0 ? _c : await client.get_account();
    // NOTE(Cole): this process of checking if the wallet is not null has already
    // been factored out and just needs to be substituted in here.
    if (wallet_address === null) {
        throw new err_1.AxelTypeError([
            "You did not supply a wallet_address and the sdk could not infer one.",
            "Have you called AxelClientInstance#connect_provider?",
        ]);
    }
    const gas_priority = (_d = r.gas_priority) !== null && _d !== void 0 ? _d : defaults_1.default_gas_priority;
    const minutes_timeout = (_e = r.minutes_timeout) !== null && _e !== void 0 ? _e : defaults_1.default_minutes_timeout;
    return {
        amount, protocol,
        client_chain, chain, token, wallet_address,
        gas_priority, minutes_timeout,
    };
}
exports.promote_request = promote_request;
function assert_response(r) {
    sup.object_has_t("rpc_requests", sup.assert_array_t(EIP_1193_1.assert_RequestArguments), r);
    void null;
}
async function two1_run(client, action, opts) {
    (0, two_1.check_protocol)(opts.protocol, opts.client_chain, opts.chain, action);
    const prior_rpc_responses = [];
    while (true) {
        const res = await (0, net_1.post)(action, client.api_key, {
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
exports.two1_run = two1_run;
