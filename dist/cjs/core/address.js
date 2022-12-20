"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert_address = void 0;
const sup = require("./sup");
const err_1 = require("./err");
const hex_string_1 = require("./hex_string");
exports.assert_address = {
    assert(u) {
        try {
            hex_string_1.assert_hex_string.assert(u);
        }
        catch (e) {
            if (e instanceof err_1.AxelTypeError) {
                throw new err_1.AxelTypeError([
                    "Tried to convert input to hex_string since address Is-A hex_string but an error was thrown:",
                    e,
                ]);
            }
            else {
                throw e;
            }
        }
        if (u.length !== 42) {
            throw new err_1.AxelTypeError([
                "An address is a 42 character hexadecimal string beginning with \"0x\".",
                "e.g. 0x2170ed0880ac9a755fd29b2688956bd959f933f8",
                "Your input was a hexadecimal string but it was the wrong length.",
                `input.length is ${u.length} instead of 42`,
                `input was ${sup.dbg_str(u)}`,
            ]);
        }
        // NOTE(Marcus): should we do the checksum thing?
    },
    typename: "address",
};
