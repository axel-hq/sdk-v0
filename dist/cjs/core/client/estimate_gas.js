"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe_estimate_gas = exports.estimate_gas = void 0;
const sup = require("../sup");
const chains_1 = require("../chains");
const hex_string_1 = require("../hex_string");
const net_1 = require("../net");
const assert_result = {
    assert(res) {
        sup.object_has_t("gas", hex_string_1.assert_hex_string, res);
        void null;
    },
    typename: "gas_res",
};
async function estimate_gas(chain) {
    const data = await (0, net_1.get)("gas", this.api_key, { chain });
    assert_result.assert(data);
    return data.gas;
}
exports.estimate_gas = estimate_gas;
async function safe_estimate_gas(__chain) {
    __chain !== null && __chain !== void 0 ? __chain : (__chain = await this.get_chain());
    chains_1.assert_chain.assert(__chain);
    return this.unsafe_estimate_gas(__chain);
}
exports.safe_estimate_gas = safe_estimate_gas;
