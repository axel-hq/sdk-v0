// Mono Token Write Operation (two1)
// Most write endpoints have a pretty similar structure to the parameters the
// server expects to receive. The only differing request type is the protocol.
// Certain requests use different protocol action-classes, so to speak.
// Compound is a lending protocol but not an swapping protocol.
import * as sup from "../sup";
import { post } from "../net";
import { AxelTypeError } from "../err";
import { assert_address } from "../address";
import { check_protocol, send_to_provider } from "./two";
import { assert_gas_priority } from "../gas_priority";
import { assert_RequestArguments } from "../providers/EIP_1193";
import { assert_chain, server_sees } from "../chains";
import { assert_token, internet_to_native_token } from "../tokens";
import { default_gas_priority, default_minutes_timeout } from "../defaults";
export function assert_request(u, assert) {
    sup.assert_object.assert(u);
    sup.object_has_t("amount", sup.assert_ufloat, u);
    sup.object_has_t("protocol", assert, u);
    sup.object_optional_t("chain", assert_chain, u);
    sup.object_optional_t("token", assert_token, u);
    sup.object_optional_t("wallet_address", assert_address, u);
    sup.object_optional_t("gas_priority", assert_gas_priority, u);
    sup.object_optional_t("minutes_timeout", sup.assert_uint, u);
    void null;
}
export async function promote_request(client, r) {
    var _a, _b, _c, _d, _e;
    const amount = r.amount;
    const protocol = r.protocol;
    const client_chain = (_a = r.chain) !== null && _a !== void 0 ? _a : await client.get_chain();
    const chain = server_sees(client_chain);
    const token = (_b = r.token) !== null && _b !== void 0 ? _b : internet_to_native_token[chain];
    const wallet_address = (_c = r.wallet_address) !== null && _c !== void 0 ? _c : await client.get_account();
    // NOTE(Cole): this process of checking if the wallet is not null has already
    // been factored out and just needs to be substituted in here.
    if (wallet_address === null) {
        throw new AxelTypeError([
            "You did not supply a wallet_address and the sdk could not infer one.",
            "Have you called AxelClientInstance#connect_provider?",
        ]);
    }
    const gas_priority = (_d = r.gas_priority) !== null && _d !== void 0 ? _d : default_gas_priority;
    const minutes_timeout = (_e = r.minutes_timeout) !== null && _e !== void 0 ? _e : default_minutes_timeout;
    return {
        amount, protocol,
        client_chain, chain, token, wallet_address,
        gas_priority, minutes_timeout,
    };
}
function assert_response(r) {
    sup.object_has_t("rpc_requests", sup.assert_array_t(assert_RequestArguments), r);
    void null;
}
export async function two1_run(client, action, opts) {
    check_protocol(opts.protocol, opts.client_chain, opts.chain, action);
    const prior_rpc_responses = [];
    while (true) {
        const res = await post(action, client.api_key, {
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
