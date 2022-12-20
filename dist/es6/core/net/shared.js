import * as sup from "../sup";
import { AxelTypeError } from "../err";
export function to_query_string(args) {
    const keys = sup.object_keys(args);
    if (keys.length === 0) {
        return "";
    }
    else {
        const key_eq_value = keys.map(key => `${key}=${args[key]}`);
        return `?${key_eq_value.join("&")}`;
    }
}
// NOTE(Marcus): can we call it api_base_url?
// NOTE(Cole): but I liked it because it reminded me of KERNELBASE.dll
export const api_base = "https://api.axel.dev/v1";
export const assert_basic_response = {
    assert(u) {
        try {
            sup.assert_object.assert(u);
            sup.object_has("status", u);
            if (u.status === "error") {
                sup.object_has_t("error", sup.assert_string, u);
            }
            else if (u.status === "success" || u.status === "continue") { }
            else {
                throw new AxelTypeError([`Invalid returned status: ${u.status}`]);
            }
        }
        catch (e) {
            if (e instanceof AxelTypeError) {
                throw new AxelTypeError([
                    "While asserting that input was a basic_response, an error was thrown:",
                    e,
                ]);
            }
            else {
                throw e;
            }
        }
        // irritatingly, we can't ask typescript to verify that this is correct
        // but it is. Source: just trust me bro
    },
    typename: "basic_response",
};
