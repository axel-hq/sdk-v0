import * as sup from "./sup";
/** all present progressive */
// NOTE(Marcus): remove action classes
export const action_classes = [
    "lending",
    "staking",
    "yielding",
    "swapping",
];
sup.object_freeze(action_classes);
export const assert_action_class = sup.tuple_make_assert_in(action_classes, "action_class");
export const actions_info = {
    lend: {
        action_class: "lending",
    },
    borrow: {
        action_class: "lending",
    },
    stake: {
        action_class: "staking",
    },
    yield: {
        action_class: "yielding",
    },
    swap: {
        action_class: "swapping",
    },
    unlend: {
        action_class: "lending",
    },
    unborrow: {
        action_class: "lending",
    },
    unyield: {
        action_class: "yielding",
    },
};
sup.object_freeze(actions_info);
export const actions = sup.object_keys(actions_info);
export const assert_action = sup.tuple_make_assert_in(actions, "action");
