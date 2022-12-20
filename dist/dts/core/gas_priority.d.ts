import * as sup from "./sup";
/** floating point between [0, 2] */
export type gas_priority = sup.newtype<"gas_priority", sup.ufloat>;
export declare const assert_gas_priority: sup.assert_obj<gas_priority>;
export declare function gas_priority_from(u: unknown): gas_priority;
export declare const gas_priorities: {
    readonly low: gas_priority;
    readonly medium: gas_priority;
    readonly high: gas_priority;
};
