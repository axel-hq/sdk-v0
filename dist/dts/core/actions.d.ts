import * as sup from "./sup";
/** all present progressive */
export declare const action_classes: readonly ["lending", "staking", "yielding", "swapping"];
export type action_class = typeof action_classes[number];
export declare const assert_action_class: sup.assert_obj<action_class>;
export declare const actions_info: {
    readonly lend: {
        readonly action_class: "lending";
    };
    readonly borrow: {
        readonly action_class: "lending";
    };
    readonly stake: {
        readonly action_class: "staking";
    };
    readonly yield: {
        readonly action_class: "yielding";
    };
    readonly swap: {
        readonly action_class: "swapping";
    };
    readonly unlend: {
        readonly action_class: "lending";
    };
    readonly unborrow: {
        readonly action_class: "lending";
    };
    readonly unyield: {
        readonly action_class: "yielding";
    };
};
export type actions_info = typeof actions_info;
export declare const actions: readonly ("lend" | "borrow" | "stake" | "yield" | "swap" | "unlend" | "unborrow" | "unyield")[];
export type action = keyof actions_info;
export declare const assert_action: sup.assert_obj<action>;
