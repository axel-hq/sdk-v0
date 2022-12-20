"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe_get_apy = exports.get_apy = exports.assert_request = void 0;
const sup = require("../sup");
const net_1 = require("../net");
const err_1 = require("../err");
const apy_1 = require("../apy");
const protocols_1 = require("../protocols");
const chains_1 = require("../chains");
const tokens_1 = require("../tokens");
function assert_request(type, u) {
    sup.assert_object.assert(u);
    const action_class = apy_1.apy_info[type];
    const pcol_assert = protocols_1.dynamic_protocol_assert[action_class];
    sup.object_has_t("protocol", pcol_assert, u);
    sup.object_optional_t("chain", chains_1.assert_internet, u);
    sup.object_optional_t("token", tokens_1.assert_token, u);
    void null;
}
exports.assert_request = assert_request;
async function promote_request(client, req) {
    var _a, _b;
    const protocol = req.protocol;
    const client_chain = (_a = req.chain) !== null && _a !== void 0 ? _a : await client.get_chain();
    if (client_chain === null) {
        throw new err_1.AxelTypeError([
            "You did not provide a chain and we could not infer one from the provider.",
            "The provider is not connected",
        ]);
    }
    const chain = (0, chains_1.server_sees)(client_chain);
    const token = (_b = req.token) !== null && _b !== void 0 ? _b : tokens_1.internet_to_native_token[chain];
    return { protocol, client_chain, chain, token };
}
function assert_response(res) {
    sup.object_has_t("apy", sup.assert_ufloat, res);
}
async function get_apy(type, opts) {
    const res = await (0, net_1.get)(`apy_${type}`, this.api_key, opts);
    assert_response(res);
    return res.apy;
}
exports.get_apy = get_apy;
async function safe_get_apy(type, opts) {
    assert_request(type, opts);
    const full = await promote_request(this, opts);
    return this.unsafe_get_apy(type, full);
}
exports.safe_get_apy = safe_get_apy;
