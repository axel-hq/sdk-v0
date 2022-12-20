"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gas_priorities = exports.gas_priority_from = exports.assert_gas_priority = void 0;
const err_1 = require("./err");
const LOWER_BOUND = 0;
const UPPER_BOUND = 2;
const err_info = [
    `Gas priority is a floating point with a lower bound of ${LOWER_BOUND} and an`,
    `upper bound of ${UPPER_BOUND}. Lower values indicate that you wish to use less`,
    "gas to complete your transaction.",
];
exports.assert_gas_priority = {
    assert(u) {
        if (typeof u !== "number") {
            throw new err_1.AxelTypeError([
                "Input is not of type number!",
                ...err_info,
            ]);
        }
        if (Number.isNaN(u)) {
            throw new err_1.AxelTypeError([
                "Input cannot be NaN!",
                ...err_info,
            ]);
        }
        if (u < LOWER_BOUND) {
            throw new err_1.AxelTypeError([
                "Input is too low!",
                ...err_info,
            ]);
        }
        if (u > UPPER_BOUND) {
            throw new err_1.AxelTypeError([
                "Input is too high!",
                ...err_info,
            ]);
        }
    },
    typename: "gas_priority",
};
function gas_priority_from(u) {
    exports.assert_gas_priority.assert(u);
    return u;
}
exports.gas_priority_from = gas_priority_from;
// NOTE(Marcus): Should these be baked and frozen?
// mm cooking metaphors
// NOTE(Cole): Right now I don't have a way to bake values.
// Also, like, who cares? This is evaluated once at module startup.
exports.gas_priorities = {
    low: gas_priority_from(0),
    medium: gas_priority_from(1),
    high: gas_priority_from(2),
};
