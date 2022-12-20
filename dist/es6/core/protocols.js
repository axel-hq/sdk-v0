import * as sup from "./sup";
import { assert_internet } from "./chains";
import { assert_action_class } from "./actions";
export const protocols_info = {
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
sup.object_freeze(protocols_info);
// freeze all of the protocols_info objects
for (const pcol of sup.object_keys(protocols_info)) {
    const info = protocols_info[pcol];
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
    const filtered = sup.object_keys(protocols_info).filter(protocol => sup.tuple_includes(protocols_info[protocol].action_class, cls));
    const typename = `${cls}_protocol`;
    return {
        assert(u) {
            sup.tuple_assert_in(filtered, typename, u);
        },
        typename,
    };
}
const protocols = sup.object_keys(protocols_info);
export const assert_protocol = sup.tuple_make_assert_in(protocols, "protocol");
export function protocol_supports_chain(pcol, chain) {
    const info = protocols_info[pcol];
    return sup.tuple_includes(info.supported_chains, chain);
}
export function safe_protocol_supports_chain(__pcol, __chain) {
    assert_protocol.assert(__pcol);
    assert_internet.assert(__chain);
    return protocol_supports_chain(__pcol, __chain);
}
export const assert_lending_protocol = make_assert_obj_of("lending");
export const assert_staking_protocol = make_assert_obj_of("staking");
export const assert_yielding_protocol = make_assert_obj_of("yielding");
export const assert_swapping_protocol = make_assert_obj_of("swapping");
export const dynamic_protocol_assert = {
    lending: assert_lending_protocol,
    staking: assert_staking_protocol,
    yielding: assert_yielding_protocol,
    swapping: assert_swapping_protocol,
};
function internal_filter_by({ chain, action_class }) {
    let filtered = [...sup.object_keys(protocols_info)];
    if (chain != null) {
        filtered = filtered.filter(pcol => sup.tuple_includes(protocols_info[pcol].supported_chains, chain));
    }
    if (action_class != null) {
        filtered = filtered.filter(pcol => sup.tuple_includes(protocols_info[pcol].action_class, action_class));
    }
    return filtered;
}
export function safe_filter_by(u) {
    const filter = sup.object_from(u);
    sup.object_optional_t("chain", assert_internet, filter);
    sup.object_optional_t("action_class", assert_action_class, filter);
    // the assertion below does not work and I don't know how to make it work
    void null;
    return internal_filter_by(filter);
}
