"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe_unlend = exports.unlend = void 0;
const util_1 = require("../providers/util");
const actions_1 = require("../actions");
const protocols_1 = require("../protocols");
const two1_1 = require("./two1");
void null;
const action_class = actions_1.actions_info["unlend"].action_class;
const assert_pcols = protocols_1.dynamic_protocol_assert[action_class];
function unlend(opts) {
    (0, util_1.check_provider)(this);
    return (0, two1_1.two1_run)(this, "unlend", opts);
}
exports.unlend = unlend;
async function safe_unlend(opts) {
    (0, util_1.check_provider)(this);
    (0, two1_1.assert_request)(opts, assert_pcols);
    const full = await (0, two1_1.promote_request)(this, opts);
    return (0, two1_1.two1_run)(this, "unlend", full);
}
exports.safe_unlend = safe_unlend;
