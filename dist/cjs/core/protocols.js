"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe_filter_by = exports.dynamic_protocol_assert = exports.assert_swapping_protocol = exports.assert_yielding_protocol = exports.assert_staking_protocol = exports.assert_lending_protocol = exports.safe_protocol_supports_chain = exports.protocol_supports_chain = exports.assert_protocol = exports.protocols_info = void 0;
const sup = require("./sup");
const chains_1 = require("./chains");
const actions_1 = require("./actions");
exports.protocols_info = {
    auto: {
        action_class: ["swapping"],
        supported_chains: ["ethereum"],
    },
    aave: {
        action_class: ["lending"],
        supported_chains: ["ethereum"],
    },
    compound: {
        action_class: ["lending"],
        supported_chains: ["ethereum"],
    },
    lido: {
        action_class: ["staking"],
        supported_chains: ["ethereum"],
    },
    rocketpool: {
        action_class: ["staking"],
        supported_chains: ["ethereum"],
    },
    sushiswap: {
        action_class: ["swapping"],
        supported_chains: ["ethereum"],
    },
    uniswap: {
        action_class: ["swapping"],
        supported_chains: ["ethereum"],
    },
    yearn: {
        action_class: ["yielding"],
        supported_chains: ["ethereum"],
    },
};
void null;
sup.object_freeze(exports.protocols_info);
// freeze all of the protocols_info objects
for (const pcol of sup.object_keys(exports.protocols_info)) {
    const info = exports.protocols_info[pcol];
    // NOTE(Marcus): Is the order here correct?
    // NOTE(Cole): yeah it's fine because even if we freeze info first, we can
    // still get a reference to action_class and supported_chains to freeze later.
    // thinkf of it like this:
    /*
       object *const protocols_info;
    */
    sup.object_freeze(info);
    /* now:
       {
          object *const action_class;
          object *const supported_chains;
       } info;
    */
    sup.object_freeze(info.action_class);
    /* now:
       string const info.action_class[];
    */
    sup.object_freeze(info.supported_chains);
    /* now:
       string const info.supported_chains[];
    */
}
function make_assert_obj_of(cls) {
    const filtered = sup.object_keys(exports.protocols_info).filter(protocol => sup.tuple_includes(exports.protocols_info[protocol].action_class, cls));
    const typename = `${cls}_protocol`;
    return {
        assert(u) {
            sup.tuple_assert_in(filtered, typename, u);
        },
        typename,
    };
}
const protocols = sup.object_keys(exports.protocols_info);
exports.assert_protocol = sup.tuple_make_assert_in(protocols, "protocol");
function protocol_supports_chain(pcol, chain) {
    const info = exports.protocols_info[pcol];
    return sup.tuple_includes(info.supported_chains, chain);
}
exports.protocol_supports_chain = protocol_supports_chain;
function safe_protocol_supports_chain(__pcol, __chain) {
    exports.assert_protocol.assert(__pcol);
    chains_1.assert_internet.assert(__chain);
    return protocol_supports_chain(__pcol, __chain);
}
exports.safe_protocol_supports_chain = safe_protocol_supports_chain;
exports.assert_lending_protocol = make_assert_obj_of("lending");
exports.assert_staking_protocol = make_assert_obj_of("staking");
exports.assert_yielding_protocol = make_assert_obj_of("yielding");
exports.assert_swapping_protocol = make_assert_obj_of("swapping");
exports.dynamic_protocol_assert = {
    lending: exports.assert_lending_protocol,
    staking: exports.assert_staking_protocol,
    yielding: exports.assert_yielding_protocol,
    swapping: exports.assert_swapping_protocol,
};
function internal_filter_by({ chain, action_class }) {
    let filtered = [...sup.object_keys(exports.protocols_info)];
    if (chain != null) {
        filtered = filtered.filter(pcol => sup.tuple_includes(exports.protocols_info[pcol].supported_chains, chain));
    }
    if (action_class != null) {
        filtered = filtered.filter(pcol => sup.tuple_includes(exports.protocols_info[pcol].action_class, action_class));
    }
    return filtered;
}
function safe_filter_by(u) {
    const filter = sup.object_from(u);
    sup.object_optional_t("chain", chains_1.assert_internet, filter);
    sup.object_optional_t("action_class", actions_1.assert_action_class, filter);
    // the assertion below does not work and I don't know how to make it work
    void null;
    return internal_filter_by(filter);
}
exports.safe_filter_by = safe_filter_by;
