import * as sup from "../sup";
import { get } from "../net";
import { check_provider } from "../providers/util";
import { assert_chain, server_sees } from "../chains";
import { assert_token } from "../tokens";
import { assert_max_slippage_percent } from "../max_slippage_percent";
import { default_max_slippage_percent } from "../defaults";
function assert_request(u) {
    sup.assert_object.assert(u);
    sup.object_optional_t("chain", assert_chain, u);
    sup.object_has_t("sell_token", assert_token, u);
    sup.object_has_t("buy_token", assert_token, u);
    sup.object_optional_t("max_slippage_percent", assert_max_slippage_percent, u);
    void null;
}
export async function promote_request(client, req) {
    var _a, _b;
    const client_chain = (_a = req.chain) !== null && _a !== void 0 ? _a : await client.get_chain();
    const max_slippage_percent = (_b = req.max_slippage_percent) !== null && _b !== void 0 ? _b : default_max_slippage_percent;
    return {
        client_chain,
        chain: server_sees(client_chain),
        sell_token: req.sell_token,
        buy_token: req.buy_token,
        max_slippage_percent,
    };
}
function assert_response(res) {
    sup.object_has_v("status", "success", res);
    sup.object_has_t("swap_rate", sup.assert_ufloat, res);
    void null;
}
async function internal_swap_rate(client, opts) {
    // NOTE(Cole): this is somewhat inconsistent, would be nice to have the whole
    // client_chain and chain dance again.
    const res = await get("swap_rate", client.api_key, {
        chain: opts.chain,
        sell_token: opts.sell_token,
        buy_token: opts.buy_token,
        max_slippage_percent: String(opts.max_slippage_percent),
    });
    assert_response(res);
    return res.swap_rate;
}
export function get_swap_rate(opts) {
    check_provider(this);
    return internal_swap_rate(this, opts);
}
export async function safe_get_swap_rate(opts = {}) {
    check_provider(this);
    assert_request(opts);
    const full = await promote_request(this, opts);
    return internal_swap_rate(this, full);
}
