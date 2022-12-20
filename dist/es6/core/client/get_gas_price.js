import * as sup from "../sup";
import { get } from "../net";
import { check_provider } from "../providers/util";
import { gas_priority_from } from "../gas_priority";
import { assert_chain, server_sees } from "../chains";
function assert_request(u) {
    sup.assert_object.assert(u);
    sup.object_has_t("gas_priority", sup.assert_number, u);
    sup.object_optional_t("chain", assert_chain, u);
    void null;
}
export async function promote_request(client, req) {
    var _a;
    const client_chain = (_a = req.chain) !== null && _a !== void 0 ? _a : await client.get_chain();
    return {
        client_chain,
        chain: server_sees(client_chain),
        gas_priority: gas_priority_from(req.gas_priority),
    };
}
function assert_response(res) {
    sup.object_has_v("status", "success", res);
    sup.object_has_t("gas_price", sup.assert_ufloat, res);
    void null;
}
async function internal_gas_price(client, opts) {
    const res = await get("gas_price", client.api_key, {
        gas_priority: opts.gas_priority.toString(),
        chain: opts.chain,
    });
    assert_response(res);
    return res.gas_price;
}
export function get_gas_price(opts) {
    check_provider(this);
    return internal_gas_price(this, opts);
}
export async function safe_get_gas_price(opts = {}) {
    check_provider(this);
    assert_request(opts);
    const full = await promote_request(this, opts);
    return internal_gas_price(this, full);
}
