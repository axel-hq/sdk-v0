"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert_apy_type = exports.apy_info = void 0;
const sup = require("./sup");
/** apy type to action class */
// NOTE(Marcus): remove action class
exports.apy_info = {
    lend: "lending",
    borrow: "lending",
    stake: "staking",
    yield: "yielding",
};
sup.object_freeze(exports.apy_info);
void exports.apy_info;
const apy_types = sup.object_keys(exports.apy_info);
exports.assert_apy_type = sup.tuple_make_assert_in(apy_types, "apy_type");
