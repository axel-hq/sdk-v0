import { AxelTypeError } from "./err";
const LOWER_BOUND = 0;
const UPPER_BOUND = 2;
const err_info = [
    `Gas priority is a floating point with a lower bound of ${LOWER_BOUND} and an`,
    `upper bound of ${UPPER_BOUND}. Lower values indicate that you wish to use less`,
    "gas to complete your transaction.",
];
export const assert_gas_priority = {
    assert(u) {
        if (typeof u !== "number") {
            throw new AxelTypeError([
                "Input is not of type number!",
                ...err_info,
            ]);
        }
        if (Number.isNaN(u)) {
            throw new AxelTypeError([
                "Input cannot be NaN!",
                ...err_info,
            ]);
        }
        if (u < LOWER_BOUND) {
            throw new AxelTypeError([
                "Input is too low!",
                ...err_info,
            ]);
        }
        if (u > UPPER_BOUND) {
            throw new AxelTypeError([
                "Input is too high!",
                ...err_info,
            ]);
        }
    },
    typename: "gas_priority",
};
export function gas_priority_from(u) {
    assert_gas_priority.assert(u);
    return u;
}
// NOTE(Marcus): Should these be baked and frozen?
// mm cooking metaphors
// NOTE(Cole): Right now I don't have a way to bake values.
// Also, like, who cares? This is evaluated once at module startup.
export const gas_priorities = {
    low: gas_priority_from(0),
    medium: gas_priority_from(1),
    high: gas_priority_from(2),
};
