import * as sup from "../sup";
import { assert_chain } from "../chains";
import { assert_hex_string } from "../hex_string";
import { get } from "../net";
const assert_result = {
    assert(res) {
        sup.object_has_t("gas", assert_hex_string, res);
        void null;
    },
    typename: "gas_res",
};
export async function estimate_gas(chain) {
    const data = await get("gas", this.api_key, { chain });
    assert_result.assert(data);
    return data.gas;
}
export async function safe_estimate_gas(__chain) {
    __chain !== null && __chain !== void 0 ? __chain : (__chain = await this.get_chain());
    assert_chain.assert(__chain);
    return this.unsafe_estimate_gas(__chain);
}
