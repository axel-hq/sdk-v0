import * as sup from "../sup";
import { get } from "../net";
import { AxelTypeError } from "../err";
import { apy_info } from "../apy";
import { dynamic_protocol_assert } from "../protocols";
import { assert_internet, server_sees } from "../chains";
import { assert_token, internet_to_native_token } from "../tokens";
export function assert_request(type, u) {
    sup.assert_object.assert(u);
    const action_class = apy_info[type];
    const pcol_assert = dynamic_protocol_assert[action_class];
    sup.object_has_t("protocol", pcol_assert, u);
    sup.object_optional_t("chain", assert_internet, u);
    sup.object_optional_t("token", assert_token, u);
    void null;
}
async function promote_request(client, req) {
    var _a, _b;
    const protocol = req.protocol;
    const client_chain = (_a = req.chain) !== null && _a !== void 0 ? _a : await client.get_chain();
    if (client_chain === null) {
        throw new AxelTypeError([
            "You did not provide a chain and we could not infer one from the provider.",
            "The provider is not connected",
        ]);
    }
    const chain = server_sees(client_chain);
    const token = (_b = req.token) !== null && _b !== void 0 ? _b : internet_to_native_token[chain];
    return { protocol, client_chain, chain, token };
}
function assert_response(res) {
    sup.object_has_t("apy", sup.assert_ufloat, res);
}
export async function get_apy(type, opts) {
    const res = await get(`apy_${type}`, this.api_key, opts);
    assert_response(res);
    return res.apy;
}
export async function safe_get_apy(type, opts) {
    assert_request(type, opts);
    const full = await promote_request(this, opts);
    return this.unsafe_get_apy(type, full);
}
