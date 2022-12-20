import * as sup from "./sup";
import { AxelError } from "./err";
import { assert_hex_string } from "./hex_string";
export const mainnets = ["ethereum"];
sup.object_freeze(mainnets);
export const assert_mainnet = sup.tuple_make_assert_in(mainnets, "mainnet");
export const testnets = ["kovan", "rinkeby", "ropsten", "goerli"];
sup.object_freeze(testnets);
export const assert_testnet = sup.tuple_make_assert_in(testnets, "testnet");
// internal (known) network
export const internets = [...mainnets, ...testnets];
sup.object_freeze(internets);
export const assert_internet = sup.tuple_make_assert_in(internets, "internet");
export function is_internet(u) {
    return sup.tuple_includes(internets, u);
}
export const externets = [];
export const assert_externet = {
    assert(u) {
        sup.tuple_assert_in(externets, "externet", u);
    },
    typename: "externet",
};
export function is_externet(u) {
    return sup.tuple_includes(externets, u);
}
function bless_externet(name) {
    externets.push(sup.UNSOUND_bless(name));
}
export const assert_chain = {
    assert(u) {
        const chains = [...mainnets, ...testnets, ...externets];
        sup.tuple_assert_in(chains, "chain", u);
    },
    typename: "chain",
};
export function is_chain(u) {
    const chains = [...mainnets, ...testnets, ...externets];
    return sup.tuple_includes(chains, u);
}
export function is_chain_id(h) {
    const chain_ids = sup.object_keys(chain_info)
        .map(chain => chain_info[chain].chain_id);
    return sup.array_includes(chain_ids, h);
}
export const assert_chain_id = {
    assert(u) {
        const chain_ids = sup.object_keys(chain_info)
            .map(chain => chain_info[chain].chain_id);
        sup.tuple_assert_in(chain_ids, "chain_id", u);
    },
    typename: "chain_id",
};
export function chain_id_to_chain(chain_id) {
    for (const chain of sup.object_keys(chain_info)) {
        const info = chain_info[chain];
        if (info.chain_id === chain_id) {
            return chain;
        }
    }
    // :scrunge:
    // Yes, TypeScript thinks this is unsound because of the damn structure of
    // that info object.
    // It doesn't know that the very fact that it's a chain_id entails the
    // existence of a corresponding entry within the infos object.
    throw new AxelError([
        "src/core/chains.ts::chain_id::to_chain",
        "",
        "If you have seen this, something has gone very, very wrong!",
        "I am pretty sure this can never, ever happen but my assumptions have",
        "been proven wrong before.",
        "This is, *probably* not your fault, though you may have done something",
        "cursed with the internal state of the sdk to specifically cause this.",
        "If you see this error and you're quite sure you've just used the sdk",
        "normally and as intended, you should really contact the Axel team.",
    ]);
}
export const chain_info = {
    ethereum: {
        type: "mainnet",
        chain_id: sup.UNSOUND_bless("0x1"),
    },
    goerli: {
        type: "testnet",
        chain_id: sup.UNSOUND_bless("0x5"),
        mainnet: "ethereum",
    },
    kovan: {
        type: "testnet",
        chain_id: sup.UNSOUND_bless("0x2a"),
        mainnet: "ethereum",
    },
    rinkeby: {
        type: "testnet",
        chain_id: sup.UNSOUND_bless("0x4"),
        mainnet: "ethereum",
    },
    ropsten: {
        type: "testnet",
        chain_id: sup.UNSOUND_bless("0x3"),
        mainnet: "ethereum",
    },
};
// freeze chain_infos inside
for (const chain of sup.object_keys(chain_info)) {
    sup.object_freeze(chain_info[chain]);
}
function bless_externet_info(name, blessable) {
    const chain_id = sup.UNSOUND_bless(blessable.chain_id);
    const forking = blessable.forking;
    const info = { type: "externet", chain_id, forking };
    sup.object_freeze(info);
    chain_info[name] = info;
}
export function add_externet(u) {
    sup.assert_object.assert(u);
    sup.object_has_t("name", sup.assert_string, u);
    sup.object_has_t("chain_id", assert_hex_string, u);
    sup.object_has_t("forking", assert_internet, u);
    void null;
    if (is_chain(u.name)) {
        throw new AxelError([
            "Tried to add a new externet (external chain) to the Axel SDK's known",
            `chains but ${sup.dbg_str(u.name)} already exists!`,
            "AxelClientInstance#add_chain({",
            `   name: ${sup.dbg_str(u.name)},`,
            `   chain_id: ${sup.dbg_str(u.chain_id)},`,
            `   forking: ${sup.dbg_str(u.forking)},`,
            "});",
        ]);
    }
    bless_externet(u.name);
    bless_externet_info(u.name, u);
}
export function server_sees(chain) {
    if (is_externet(chain)) {
        return chain_info[chain].forking;
    }
    else {
        return chain;
    }
}
