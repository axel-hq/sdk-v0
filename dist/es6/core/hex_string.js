import * as sup from "./sup";
import { AxelTypeError } from "./err";
const hex_char = /^[0-9a-f]$/i;
const is_hex_regex = /^0x[0-9a-f]*$/i;
export const assert_hex_string = {
    assert(u) {
        if (typeof u !== "string") {
            throw new AxelTypeError([
                `Input of type ${sup.dbg_str(u)} is not of type "string" and therefore`,
                "cannot be a hex_string.",
            ]);
        }
        if (u.startsWith("0x")) { }
        else {
            throw new AxelTypeError([
                "String does not start with \"0x\".",
                `Instead started with "${u.slice(0, 2)}".`,
                "Therefore it is not a hex_string.",
            ]);
        }
        if (is_hex_regex.test(u)) { }
        else {
            const weird = [...u.slice(2)].map(c => hex_char.test(c) ? " " : "?").join("");
            throw new AxelTypeError([
                "String starts with \"0x\" which would indicate a hexadecimal string",
                "but the value specified is not in base 16",
                `input = "${u}"`,
                `           ${weird}`,
            ]);
        }
    },
    typename: "hex_string",
};
export function from(s) {
    assert_hex_string.assert(s);
    return s;
}
export function hex_string_to_uint(h) {
    const pint = parseInt(h, 16);
    sup.assert_uint.assert(pint);
    return pint;
}
export function hex_string_to_ufloat(int, decimals) {
    return sup.uint_to_ufloat_from_decimals(hex_string_to_uint(int), decimals);
}
