"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe_get_swap_rate = exports.get_swap_rate = exports.promote_request = void 0;
const sup = require("../sup");
const net_1 = require("../net");
const util_1 = require("../providers/util");
const chains_1 = require("../chains");
const tokens_1 = require("../tokens");
const max_slippage_percent_1 = require("../max_slippage_percent");
const defaults_1 = require("../defaults");
function assert_request(u) {
    sup.assert_object.assert(u);
    sup.object_optional_t("chain", chains_1.assert_chain, u);
    sup.object_has_t("sell_token", tokens_1.assert_token, u);
    sup.object_has_t("buy_token", tokens_1.assert_token, u);
    sup.object_optional_t("max_slippage_percent", max_slippage_percent_1.assert_max_slippage_percent, u);
    void null;
}
async function promote_request(client, req) {
    var _a, _b;
    const client_chain = (_a = req.chain) !== null && _a !== void 0 ? _a : await client.get_chain();
    const max_slippage_percent = (_b = req.max_slippage_percent) !== null && _b !== void 0 ? _b : defaults_1.default_max_slippage_percent;
    return {
        client_chain,
        chain: (0, chains_1.server_sees)(client_chain),
        sell_token: req.sell_token,
        buy_token: req.buy_token,
        max_slippage_percent,
    };
}
exports.promote_request = promote_request;
function assert_response(res) {
    sup.object_has_v("status", "success", res);
    sup.object_has_t("swap_rate", sup.assert_ufloat, res);
    void null;
}
async function internal_swap_rate(client, opts) {
    // NOTE(Cole): this is somewhat inconsistent, would be nice to have the whole
    // client_chain and chain dance again.
    const res = await (0, net_1.get)("swap_rate", client.api_key, {
        chain: opts.chain,
        sell_token: opts.sell_token,
        buy_token: opts.buy_token,
        max_slippage_percent: String(opts.max_slippage_percent),
    });
    assert_response(res);
    return res.swap_rate;
}
function get_swap_rate(opts) {
    (0, util_1.check_provider)(this);
    return internal_swap_rate(this, opts);
}
exports.get_swap_rate = get_swap_rate;
async function safe_get_swap_rate(opts = {}) {
    (0, util_1.check_provider)(this);
    assert_request(opts);
    const full = await promote_request(this, opts);
    return internal_swap_rate(this, full);
}
exports.safe_get_swap_rate = safe_get_swap_rate;
