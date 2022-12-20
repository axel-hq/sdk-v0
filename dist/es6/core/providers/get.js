import { F } from "@axel-hq/foundatsion";
import * as sup from "../sup";
import * as EIP_1193 from "./EIP_1193";
import { AxelError, AxelTypeError } from "../err";
export async function get_provider(__ethereum) {
    if (F.oo.is(__ethereum)) {
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
        throw new F.Error("The only valid arguments to AxelClientInstance#get_provider are a provider object or one of", "the following strings:\n", "> \"metamask\"\n", "> \"coinbase\"", "> \"wallet_connect\"");
    }
}
async function get_provider_window(__ethereum) {
    // have to do this one because we don't know if it's defined yet
    // NOTE(Marcus): change type to unknown
    const window = globalThis.window;
    // NOTE(Marcus):
    // The window type doesn't change after this assert_object.assert(window).
    // I trust that it works, but it seems a little :thonk:
    try {
        F.oo.assert(window);
    }
    catch (e) {
        if (e instanceof AxelTypeError) {
            if (typeof process === "undefined") {
                // We are not running node
                throw new AxelTypeError([
                    `Could not assert that window was a ${sup.assert_object.typename}.`,
                    e,
                ]);
            }
            else {
                // We are running node
                // NOTE(Cole):
                // I think metamask might be runnable on node somehow so consider
                // that in the future we might want to use globalThis.ethereum?
                throw new AxelError([
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
        F.oo.assert_field_is(window, "ethereum", F.oo);
    }
    catch (e) {
        if (e instanceof AxelTypeError) {
            throw new AxelError([
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
                    if (e instanceof AxelTypeError) {
                        throw new AxelTypeError([
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
                throw new F.Error("Connected wallet is not MetaMask");
            }
        }
        else { // 2+ wallets connected
            // assert that window.ethereum.providerMap is an object with a get() function      
            F.oo.assert_field_is(window.ethereum, "providerMap", F.auto({ get: F.any_fn }));
            const metaMaskProvider = window.ethereum.providerMap.get("MetaMask");
            // check that connected wallet is MetaMask
            if (metaMaskProvider !== undefined) {
                // check that the window.ethereum object is an EIP-1193 provider
                try {
                    EIP_1193.assert_EIP_1193_Provider.assert(metaMaskProvider);
                    return metaMaskProvider; // <--- happy path eeeeeee
                }
                catch (e) {
                    if (e instanceof AxelTypeError) {
                        throw new AxelTypeError([
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
                throw new F.Error("Connected wallets do not contain MetaMask");
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
                    if (e instanceof AxelTypeError) {
                        throw new AxelTypeError([
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
                throw new F.Error("Connected wallet is not Coinbase Wallet");
            }
        }
        else { // 2+ wallets connected
            // assert that window.ethereum.providerMap is an object with a get() function      
            F.oo.assert_field_is(window.ethereum, "providerMap", F.auto({ get: F.any_fn }));
            const coinbaseProvider = window.ethereum.providerMap.get("CoinbaseWallet");
            // check that connected wallet is Coinbase
            if (coinbaseProvider !== undefined) {
                // check that the window.ethereum object is an EIP-1193 provider
                try {
                    EIP_1193.assert_EIP_1193_Provider.assert(coinbaseProvider);
                    return coinbaseProvider; // <--- happy path eeeeeee
                }
                catch (e) {
                    if (e instanceof AxelTypeError) {
                        throw new AxelTypeError([
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
                throw new F.Error("Connected wallets do not contain Coinbase Wallet");
            }
        }
    }
}
async function get_provider_wallet_connect() {
    throw new F.Error("wallet_connect is not yet implemented! :(");
}
