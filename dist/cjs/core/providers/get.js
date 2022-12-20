"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_provider = void 0;
const foundatsion_1 = require("@axel-hq/foundatsion");
const sup = require("../sup");
const EIP_1193 = require("./EIP_1193");
const err_1 = require("../err");
async function get_provider(__ethereum) {
    if (foundatsion_1.F.oo.is(__ethereum)) {
        EIP_1193.assert_EIP_1193_Provider.assert(__ethereum);
        return __ethereum; // <------------------------------------ happy path 1/2
    }
    if (__ethereum === "metamask" || __ethereum === "coinbase") {
        return get_provider_window(__ethereum);
    }
    else if (__ethereum === "wallet_connect") {
        return get_provider_wallet_connect();
    }
    else {
        throw new foundatsion_1.F.Error("The only valid arguments to AxelClientInstance#get_provider are a provider object or one of", "the following strings:\n", "> \"metamask\"\n", "> \"coinbase\"", "> \"wallet_connect\"");
    }
}
exports.get_provider = get_provider;
async function get_provider_window(__ethereum) {
    // have to do this one because we don't know if it's defined yet
    // NOTE(Marcus): change type to unknown
    const window = globalThis.window;
    // NOTE(Marcus):
    // The window type doesn't change after this assert_object.assert(window).
    // I trust that it works, but it seems a little :thonk:
    try {
        foundatsion_1.F.oo.assert(window);
    }
    catch (e) {
        if (e instanceof err_1.AxelTypeError) {
            if (typeof process === "undefined") {
                // We are not running node
                throw new err_1.AxelTypeError([
                    `Could not assert that window was a ${sup.assert_object.typename}.`,
                    e,
                ]);
            }
            else {
                // We are running node
                // NOTE(Cole):
                // I think metamask might be runnable on node somehow so consider
                // that in the future we might want to use globalThis.ethereum?
                throw new err_1.AxelError([
                    "process global exists which implies that this library is being run in NodeJS.",
                    "As such, you must provide your own eip-1193 provider.",
                    "There are no users to inject an ExternalProvider into globalThis.ethereum.",
                    "To provide your own ExternalProvider, please see Axel's documentation:",
                    "https://docs.axel.dev/reference/axel-connect_provider",
                    "This sdk will specifically check for the existence of a .request function",
                ]);
            }
        }
        else {
            throw e;
        }
    }
    try {
        // checks for window.ethereum (could be MetaMask or Coinbase or both)
        foundatsion_1.F.oo.assert_field_is(window, "ethereum", foundatsion_1.F.oo);
    }
    catch (e) {
        if (e instanceof err_1.AxelTypeError) {
            throw new err_1.AxelError([
                "Tried to connect to a web3 provider but window.ethereum",
                "was not present. Does your user have a wallet installed?",
                e,
            ]);
        }
        else {
            throw e;
        }
    }
    // we've already checked that the user has at least one wallet connected
    // metamask case
    if (__ethereum === "metamask") {
        if (window.ethereum.providerMap === undefined) { // 1 wallet connected
            // check that connected wallet is MetaMask
            if (window.ethereum.isMetaMask) {
                // check that the window.ethereum object is an EIP-1193 provider
                try {
                    EIP_1193.assert_EIP_1193_Provider.assert(window.ethereum);
                    return window.ethereum; // <--- happy path eeeeeee
                }
                catch (e) {
                    if (e instanceof err_1.AxelTypeError) {
                        throw new err_1.AxelTypeError([
                            "window.ethereum exists but is not a valid ExternalProvider:",
                            e,
                        ]);
                    }
                    else {
                        throw e;
                    }
                }
            }
            else {
                throw new foundatsion_1.F.Error("Connected wallet is not MetaMask");
            }
        }
        else { // 2+ wallets connected
            // assert that window.ethereum.providerMap is an object with a get() function      
            foundatsion_1.F.oo.assert_field_is(window.ethereum, "providerMap", foundatsion_1.F.auto({ get: foundatsion_1.F.any_fn }));
            const metaMaskProvider = window.ethereum.providerMap.get("MetaMask");
            // check that connected wallet is MetaMask
            if (metaMaskProvider !== undefined) {
                // check that the window.ethereum object is an EIP-1193 provider
                try {
                    EIP_1193.assert_EIP_1193_Provider.assert(metaMaskProvider);
                    return metaMaskProvider; // <--- happy path eeeeeee
                }
                catch (e) {
                    if (e instanceof err_1.AxelTypeError) {
                        throw new err_1.AxelTypeError([
                            "window.ethereum exists but is not a valid ExternalProvider:",
                            e,
                        ]);
                    }
                    else {
                        throw e;
                    }
                }
            }
            else {
                throw new foundatsion_1.F.Error("Connected wallets do not contain MetaMask");
            }
        }
    }
    // coinbase case
    if (__ethereum === "coinbase" || true) {
        if (window.ethereum.providerMap === undefined) { // 1 wallet connected
            // check that connected wallet is Coinbase
            if (window.ethereum.isCoinbaseWallet) {
                // check that the window.ethereum object is an EIP-1193 provider
                try {
                    EIP_1193.assert_EIP_1193_Provider.assert(window.ethereum);
                    return window.ethereum; // <--- happy path eeeeeee
                }
                catch (e) {
                    if (e instanceof err_1.AxelTypeError) {
                        throw new err_1.AxelTypeError([
                            "window.ethereum exists but is not a valid ExternalProvider:",
                            e,
                        ]);
                    }
                    else {
                        throw e;
                    }
                }
            }
            else {
                throw new foundatsion_1.F.Error("Connected wallet is not Coinbase Wallet");
            }
        }
        else { // 2+ wallets connected
            // assert that window.ethereum.providerMap is an object with a get() function      
            foundatsion_1.F.oo.assert_field_is(window.ethereum, "providerMap", foundatsion_1.F.auto({ get: foundatsion_1.F.any_fn }));
            const coinbaseProvider = window.ethereum.providerMap.get("CoinbaseWallet");
            // check that connected wallet is Coinbase
            if (coinbaseProvider !== undefined) {
                // check that the window.ethereum object is an EIP-1193 provider
                try {
                    EIP_1193.assert_EIP_1193_Provider.assert(coinbaseProvider);
                    return coinbaseProvider; // <--- happy path eeeeeee
                }
                catch (e) {
                    if (e instanceof err_1.AxelTypeError) {
                        throw new err_1.AxelTypeError([
                            "window.ethereum exists but is not a valid ExternalProvider:",
                            e,
                        ]);
                    }
                    else {
                        throw e;
                    }
                }
            }
            else {
                throw new foundatsion_1.F.Error("Connected wallets do not contain Coinbase Wallet");
            }
        }
    }
}
async function get_provider_wallet_connect() {
    throw new foundatsion_1.F.Error("wallet_connect is not yet implemented! :(");
}
