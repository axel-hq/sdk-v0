"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hex_string_to_ufloat = exports.hex_string_to_uint = exports.from = exports.assert_hex_string = void 0;
const sup = require("./sup");
const err_1 = require("./err");
const hex_char = /^[0-9a-f]$/i;
const is_hex_regex = /^0x[0-9a-f]*$/i;
exports.assert_hex_string = {
    assert(u) {
        if (typeof u !== "string") {
            throw new err_1.AxelTypeError([
                `Input of type ${sup.dbg_str(u)} is not of type "string" and therefore`,
                "cannot be a hex_string.",
            ]);
        }
        if (u.startsWith("0x")) { }
        else {
            throw new err_1.AxelTypeError([
                "String does not start with \"0x\".",
                `Instead started with "${u.slice(0, 2)}".`,
                "Therefore it is not a hex_string.",
            ]);
        }
        if (is_hex_regex.test(u)) { }
        else {
            const weird = [...u.slice(2)].map(c => hex_char.test(c) ? " " : "?").join("");
            throw new err_1.AxelTypeError([
                "String starts with \"0x\" which would indicate a hexadecimal string",
                "but the value specified is not in base 16",
                `input = "${u}"`,
                `           ${weird}`,
            ]);
        }
    },
    typename: "hex_string",
};
function from(s) {
    exports.assert_hex_string.assert(s);
    return s;
}
exports.from = from;
function hex_string_to_uint(h) {
    const pint = parseInt(h, 16);
    sup.assert_uint.assert(pint);
    return pint;
}
exports.hex_string_to_uint = hex_string_to_uint;
function hex_string_to_ufloat(int, decimals) {
    return sup.uint_to_ufloat_from_decimals(hex_string_to_uint(int), decimals);
}
exports.hex_string_to_ufloat = hex_string_to_ufloat;
