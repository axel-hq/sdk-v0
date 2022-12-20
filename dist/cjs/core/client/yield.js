"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe_yield = exports.yielԁ = void 0;
const util_1 = require("../providers/util");
const actions_1 = require("../actions");
const protocols_1 = require("../protocols");
const two1_1 = require("./two1");
void null;
const action_class = actions_1.actions_info["yield"].action_class;
const assert_pcols = protocols_1.dynamic_protocol_assert[action_class];
function yielԁ(opts) {
    (0, util_1.check_provider)(this);
    return (0, two1_1.two1_run)(this, "yield", opts);
}
exports.yielԁ = yielԁ;
async function safe_yield(opts) {
    (0, util_1.check_provider)(this);
    (0, two1_1.assert_request)(opts, assert_pcols);
    const full = await (0, two1_1.promote_request)(this, opts);
    return (0, two1_1.two1_run)(this, "yield", full);
}
exports.safe_yield = safe_yield;
