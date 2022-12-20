"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe_get_gas_price = exports.get_gas_price = exports.promote_request = void 0;
const sup = require("../sup");
const net_1 = require("../net");
const util_1 = require("../providers/util");
const gas_priority_1 = require("../gas_priority");
const chains_1 = require("../chains");
function assert_request(u) {
    sup.assert_object.assert(u);
    sup.object_has_t("gas_priority", sup.assert_number, u);
    sup.object_optional_t("chain", chains_1.assert_chain, u);
    void null;
}
async function promote_request(client, req) {
    var _a;
    const client_chain = (_a = req.chain) !== null && _a !== void 0 ? _a : await client.get_chain();
    return {
        client_chain,
        chain: (0, chains_1.server_sees)(client_chain),
        gas_priority: (0, gas_priority_1.gas_priority_from)(req.gas_priority),
    };
}
exports.promote_request = promote_request;
function assert_response(res) {
    sup.object_has_v("status", "success", res);
    sup.object_has_t("gas_price", sup.assert_ufloat, res);
    void null;
}
async function internal_gas_price(client, opts) {
    const res = await (0, net_1.get)("gas_price", client.api_key, {
        gas_priority: opts.gas_priority.toString(),
        chain: opts.chain,
    });
    assert_response(res);
    return res.gas_price;
}
function get_gas_price(opts) {
    (0, util_1.check_provider)(this);
    return internal_gas_price(this, opts);
}
exports.get_gas_price = get_gas_price;
async function safe_get_gas_price(opts = {}) {
    (0, util_1.check_provider)(this);
    assert_request(opts);
    const full = await promote_request(this, opts);
    return internal_gas_price(this, full);
}
exports.safe_get_gas_price = safe_get_gas_price;
