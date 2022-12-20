import * as sup from "./sup";
/** apy type to action class */
export declare const apy_info: {
    readonly lend: "lending";
    readonly borrow: "lending";
    readonly stake: "staking";
    readonly yield: "yielding";
};
export type apy_info = typeof apy_info;
export type apy_type = keyof apy_info;
export declare const assert_apy_type: sup.assert_obj<apy_type>;
