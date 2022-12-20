"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert_action = exports.actions = exports.actions_info = exports.assert_action_class = exports.action_classes = void 0;
const sup = require("./sup");
/** all present progressive */
// NOTE(Marcus): remove action classes
exports.action_classes = [
    "lending",
    "staking",
    "yielding",
    "swapping",
];
sup.object_freeze(exports.action_classes);
exports.assert_action_class = sup.tuple_make_assert_in(exports.action_classes, "action_class");
exports.actions_info = {
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
sup.object_freeze(exports.actions_info);
exports.actions = sup.object_keys(exports.actions_info);
exports.assert_action = sup.tuple_make_assert_in(exports.actions, "action");
