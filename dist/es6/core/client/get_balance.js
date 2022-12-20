import * as sup from "../sup";
import { post } from "../net";
import { AxelTypeError } from "../err";
import { check_provider } from "../providers/util";
import { assert_address } from "../address";
import { hex_string_to_ufloat } from "../hex_string";
import { assert_RequestArguments } from "../providers/EIP_1193";
import { assert_chain, server_sees } from "../chains";
import { assert_token, internet_to_native_token } from "../tokens";
import { send_to_provider } from "./two";
function assert_request(u) {
    sup.assert_object.assert(u);
    sup.object_optional_t("chain", assert_chain, u);
    sup.object_optional_t("token", assert_token, u);
    sup.object_optional_t("wallet_address", assert_address, u);
    void null;
}
export async function promote_request(client, req) {
    var _a, _b, _c;
    const client_chain = (_a = req.chain) !== null && _a !== void 0 ? _a : await client.get_chain();
    const chain = server_sees(client_chain);
    const token = (_b = req.token) !== null && _b !== void 0 ? _b : internet_to_native_token[chain];
    const wallet_address = (_c = req.wallet_address) !== null && _c !== void 0 ? _c : await client.get_account();
    // maybe some kind of get_non_null_active_selected account to abstract
    // over this error in the future
    if (wallet_address === null) {
        throw new AxelTypeError([
            "You did not supply a wallet_address and the sdk could not infer one.",
            "Have you called AxelClientInstance#connect_provider?",
        ]);
    }
    return { client_chain, chain, token, wallet_address };
}
function assert_response(res) {
    sup.object_has_t("rpc_requests", sup.assert_array_singleton_t(assert_RequestArguments), res);
    sup.object_has_t("decimals", sup.assert_uint, res);
    sup.object_has_v("status", "success", res);
    void null;
}
export async function internal_get_balance_request(client, opts) {
    // NOTE(Cole): this is somewhat inconsistent, would be nice to have the whole
    // client_chain and chain dance again.
    const res = await post("balance", client.api_key, {
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
async function internal_get_balance(client, opts) {
    const req = await internal_get_balance_request(client, opts);
    const provider_response = await send_to_provider(client, opts.client_chain, req.rpc_request);
    const amount = hex_string_to_ufloat(provider_response, req.decimals);
    return amount;
}
export function get_balance(opts) {
    check_provider(this);
    return internal_get_balance(this, opts);
}
export async function safe_get_balance(opts = {}) {
    check_provider(this);
    assert_request(opts);
    const full = await promote_request(this, opts);
    return internal_get_balance(this, full);
}
