"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert_basic_response = exports.api_base = exports.to_query_string = void 0;
const sup = require("../sup");
const err_1 = require("../err");
function to_query_string(args) {
    const keys = sup.object_keys(args);
    if (keys.length === 0) {
        return "";
    }
    else {
        const key_eq_value = keys.map(key => `${key}=${args[key]}`);
        return `?${key_eq_value.join("&")}`;
    }
}
exports.to_query_string = to_query_string;
// NOTE(Marcus): can we call it api_base_url?
// NOTE(Cole): but I liked it because it reminded me of KERNELBASE.dll
exports.api_base = "https://api.axel.dev/v1";
exports.assert_basic_response = {
    assert(u) {
        try {
            sup.assert_object.assert(u);
            sup.object_has("status", u);
            if (u.status === "error") {
                sup.object_has_t("error", sup.assert_string, u);
            }
            else if (u.status === "success" || u.status === "continue") { }
            else {
                throw new err_1.AxelTypeError([`Invalid returned status: ${u.status}`]);
            }
        }
        catch (e) {
            if (e instanceof err_1.AxelTypeError) {
                throw new err_1.AxelTypeError([
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
