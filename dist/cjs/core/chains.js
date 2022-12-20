"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server_sees = exports.add_externet = exports.chain_info = exports.chain_id_to_chain = exports.assert_chain_id = exports.is_chain_id = exports.is_chain = exports.assert_chain = exports.is_externet = exports.assert_externet = exports.externets = exports.is_internet = exports.assert_internet = exports.internets = exports.assert_testnet = exports.testnets = exports.assert_mainnet = exports.mainnets = void 0;
const sup = require("./sup");
const err_1 = require("./err");
const hex_string_1 = require("./hex_string");
exports.mainnets = ["ethereum"];
sup.object_freeze(exports.mainnets);
exports.assert_mainnet = sup.tuple_make_assert_in(exports.mainnets, "mainnet");
exports.testnets = ["kovan", "rinkeby", "ropsten", "goerli"];
sup.object_freeze(exports.testnets);
exports.assert_testnet = sup.tuple_make_assert_in(exports.testnets, "testnet");
// internal (known) network
exports.internets = [...exports.mainnets, ...exports.testnets];
sup.object_freeze(exports.internets);
exports.assert_internet = sup.tuple_make_assert_in(exports.internets, "internet");
function is_internet(u) {
    return sup.tuple_includes(exports.internets, u);
}
exports.is_internet = is_internet;
exports.externets = [];
exports.assert_externet = {
    assert(u) {
        sup.tuple_assert_in(exports.externets, "externet", u);
    },
    typename: "externet",
};
function is_externet(u) {
    return sup.tuple_includes(exports.externets, u);
}
exports.is_externet = is_externet;
function bless_externet(name) {
    exports.externets.push(sup.UNSOUND_bless(name));
}
exports.assert_chain = {
    assert(u) {
        const chains = [...exports.mainnets, ...exports.testnets, ...exports.externets];
        sup.tuple_assert_in(chains, "chain", u);
    },
    typename: "chain",
};
function is_chain(u) {
    const chains = [...exports.mainnets, ...exports.testnets, ...exports.externets];
    return sup.tuple_includes(chains, u);
}
exports.is_chain = is_chain;
function is_chain_id(h) {
    const chain_ids = sup.object_keys(exports.chain_info)
        .map(chain => exports.chain_info[chain].chain_id);
    return sup.array_includes(chain_ids, h);
}
exports.is_chain_id = is_chain_id;
exports.assert_chain_id = {
    assert(u) {
        const chain_ids = sup.object_keys(exports.chain_info)
            .map(chain => exports.chain_info[chain].chain_id);
        sup.tuple_assert_in(chain_ids, "chain_id", u);
    },
    typename: "chain_id",
};
function chain_id_to_chain(chain_id) {
    for (const chain of sup.object_keys(exports.chain_info)) {
        const info = exports.chain_info[chain];
        if (info.chain_id === chain_id) {
            return chain;
        }
    }
    // :scrunge:
    // Yes, TypeScript thinks this is unsound because of the damn structure of
    // that info object.
    // It doesn't know that the very fact that it's a chain_id entails the
    // existence of a corresponding entry within the infos object.
    throw new err_1.AxelError([
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
exports.chain_id_to_chain = chain_id_to_chain;
exports.chain_info = {
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
for (const chain of sup.object_keys(exports.chain_info)) {
    sup.object_freeze(exports.chain_info[chain]);
}
function bless_externet_info(name, blessable) {
    const chain_id = sup.UNSOUND_bless(blessable.chain_id);
    const forking = blessable.forking;
    const info = { type: "externet", chain_id, forking };
    sup.object_freeze(info);
    exports.chain_info[name] = info;
}
function add_externet(u) {
    sup.assert_object.assert(u);
    sup.object_has_t("name", sup.assert_string, u);
    sup.object_has_t("chain_id", hex_string_1.assert_hex_string, u);
    sup.object_has_t("forking", exports.assert_internet, u);
    void null;
    if (is_chain(u.name)) {
        throw new err_1.AxelError([
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
exports.add_externet = add_externet;
function server_sees(chain) {
    if (is_externet(chain)) {
        return exports.chain_info[chain].forking;
    }
    else {
        return chain;
    }
}
exports.server_sees = server_sees;
