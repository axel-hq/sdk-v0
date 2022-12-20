import * as sup from "../sup";
import { AxelTypeError } from "../err";
import { check_provider } from "../providers/util";
import { assert_token } from "../tokens";
import { assert_address } from "../address";
import { default_minutes_timeout, default_max_slippage_percent } from "../defaults";
import { post } from "../net";
import { check_protocol, send_to_provider } from "./two";
import { assert_RequestArguments } from "../providers/EIP_1193";
import { assert_chain, server_sees } from "../chains";
import { assert_swapping_protocol } from "../protocols";
import { assert_gas_priority, gas_priorities } from "../gas_priority";
import { assert_max_slippage_percent } from "../max_slippage_percent";
function assert_request(u) {
    sup.assert_object.assert(u);
    sup.object_has_t("sell_amount", sup.assert_ufloat, u);
    sup.object_has_t("sell_token", assert_token, u);
    sup.object_has_t("buy_token", assert_token, u);
    sup.object_optional_t("protocol", assert_swapping_protocol, u);
    sup.object_optional_t("chain", assert_chain, u);
    sup.object_optional_t("wallet_address", assert_address, u);
    sup.object_optional_t("max_slippage_percent", assert_max_slippage_percent, u);
    sup.object_optional_t("gas_priority", assert_gas_priority, u);
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
    const chain = server_sees(client_chain);
    const wallet_address = (_c = r.wallet_address) !== null && _c !== void 0 ? _c : await client.get_account();
    // NOTE(Cole): this process of checking if the wallet is not null has already
    // been factored out and just needs to be substituted in here.
    if (wallet_address === null) {
        throw new AxelTypeError([
            "You did not supply a wallet_address and the sdk could not infer one.",
            "Have you called AxelClientInstance#connect_provider?",
        ]);
    }
    const max_slippage_percent = (_d = r.max_slippage_percent) !== null && _d !== void 0 ? _d : default_max_slippage_percent;
    const gas_priority = (_e = r.gas_priority) !== null && _e !== void 0 ? _e : gas_priorities.medium;
    const minutes_timeout = (_f = r.minutes_timeout) !== null && _f !== void 0 ? _f : default_minutes_timeout;
    return {
        sell_amount, sell_token, buy_token, protocol,
        client_chain, chain, wallet_address,
        max_slippage_percent,
        gas_priority, minutes_timeout,
    };
}
function assert_response(res) {
    sup.object_has_t("rpc_requests", sup.assert_array_t(assert_RequestArguments), res);
    void null;
}
async function internal_swap(client, opts) {
    check_protocol(opts.protocol, opts.client_chain, opts.chain, "swapping");
    const prior_rpc_responses = [];
    while (true) {
        const res = await post("swap", client.api_key, {
            ...opts,
            prior_rpc_responses,
        });
        assert_response(res);
        const provider_responses = [];
        for (const rpc_request of res.rpc_requests) {
            const provider_response = await send_to_provider(client, opts.client_chain, rpc_request);
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
export function swap(opts) {
    check_provider(this);
    return internal_swap(this, opts);
}
export async function safe_swap(opts) {
    check_provider(this);
    assert_request(opts);
    const full_request = await promote_request(this, opts);
    return internal_swap(this, full_request);
}
