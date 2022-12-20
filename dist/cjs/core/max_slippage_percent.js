"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.max_slippage_percent_from = exports.assert_max_slippage_percent = void 0;
const err_1 = require("./err");
const LOWER_BOUND = 0;
const UPPER_BOUND = 100;
const err_info = [
    "Max slippage percent is a floating point between 0 and 100 representing the maximum",
    "percent that the user is willing to let the price slip on a swap transaction.",
];
exports.assert_max_slippage_percent = {
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
    typename: "max_slippage_percent",
};
function max_slippage_percent_from(u) {
    exports.assert_max_slippage_percent.assert(u);
    return u;
}
exports.max_slippage_percent_from = max_slippage_percent_from;
