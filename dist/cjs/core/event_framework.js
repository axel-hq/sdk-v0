"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instantiate_event_framework = void 0;
const sup = require("./sup");
const get_1 = require("./providers/get");
const util_1 = require("./providers/util");
const hex_string_1 = require("./hex_string");
const EIP_1193_1 = require("./providers/EIP_1193");
const chains_1 = require("./chains");
const events_1 = require("./events");
function instantiate_event_framework(client) {
    const listeners = {
        provider_connect: [],
        provider_disconnect: [],
        chain_update: [],
        accounts_update: [],
    };
    function internal_on(name, listener) {
        // :powerscrunge:
        listeners[name].push(listener);
    }
    function on(name, listener) {
        events_1.assert_event_name.assert(name);
        sup.assert_any_fn.assert(listener);
        internal_on(name, sup.UNSOUND_shut_up(listener));
    }
    function internal_emit(name, arg) {
        for (const listener of listeners[name]) {
            try {
                sup.UNSOUND_unlock(listener)(arg);
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    function internal_off(name, listener) {
        return sup.array_remove(listeners[name], listener);
    }
    function off(name, listener) {
        events_1.assert_event_name.assert(name);
        sup.assert_any_fn.assert(listener);
        return internal_off(name, listener);
    }
    // listeners that sit between the provider and us
    function on_accountsChanged(accounts) {
        try {
            util_1.assert_accounts.assert(accounts);
        }
        catch (e) {
            internal_emit("accounts_update", {
                status: "error",
                error: sup.UNSOUND_cast(e),
            });
            return;
        }
        internal_emit("accounts_update", {
            status: "ok",
            accounts,
        });
    }
    function on_chainChanged(chain_id) {
        try {
            hex_string_1.assert_hex_string.assert(chain_id);
        }
        catch (e) {
            // NOTE(Cole): maybe get rid of these unsound casts
            // NOTE(Cole): I dunno what this ^^ idiot is talking about.
            // NOTE(Marcus): I dunno what this ^^ idiot is talking about
            internal_emit("chain_update", {
                status: "error",
                error: sup.UNSOUND_cast(e),
            });
            return;
        }
        if ((0, chains_1.is_chain_id)(chain_id)) {
            const chain = (0, chains_1.chain_id_to_chain)(chain_id);
            internal_emit("chain_update", {
                status: "known",
                chain,
                chain_id,
            });
        }
        else {
            internal_emit("chain_update", {
                status: "unknown",
                chain: null,
                chain_id,
            });
        }
    }
    function on_connect(u) {
        internal_emit("provider_connect", void u);
    }
    function on_disconnect(u) {
        try {
            EIP_1193_1.assert_ProviderRpcError.assert(u);
        }
        catch (e) {
            console.error(e);
            return;
        }
        internal_emit("provider_disconnect", u);
    }
    // AxelCoreClient#connect_provider
    async function connect_provider(ethereum) {
        const provider = await (0, get_1.get_provider)(ethereum);
        provider.on("accountsChanged", on_accountsChanged);
        provider.on("chainChanged", on_chainChanged);
        provider.on("connect", on_connect);
        provider.on("disconnect", on_disconnect);
        try {
            const accounts = await provider.request({ method: "eth_requestAccounts", params: [] });
            on_connect(undefined);
            on_accountsChanged(accounts);
        }
        catch (e) {
            console.error(e);
        }
        try {
            const chain_id = await provider.request({ method: "eth_chainId" });
            on_chainChanged(chain_id);
        }
        catch (e) {
            console.error(e);
        }
        client.provider = provider;
    }
    client.on = on;
    client.off = off;
    client.connect_provider = connect_provider;
}
exports.instantiate_event_framework = instantiate_event_framework;
