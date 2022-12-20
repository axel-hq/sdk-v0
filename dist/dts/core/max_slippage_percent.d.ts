import * as sup from "./sup";
/** floating point between [0, 100] */
export type max_slippage_percent = sup.newtype<"max_slippage_percent", sup.ufloat>;
export declare const assert_max_slippage_percent: sup.assert_obj<max_slippage_percent>;
export declare function max_slippage_percent_from(u: unknown): max_slippage_percent;
