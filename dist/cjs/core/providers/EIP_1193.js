"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert_EIP_1193_Provider = exports.assert_ProviderRpcError = exports.assert_ProviderConnectInfo = exports.assert_RequestArguments = void 0;
// see https://eips.ethereum.org/EIPS/eip-1193
const sup = require("../sup");
const err_1 = require("../err");
const hex_string_1 = require("../hex_string");
exports.assert_RequestArguments = {
    assert(u) {
        sup.assert_object.assert(u);
        sup.object_has_t("method", sup.assert_string, u);
        if (sup.object_hop("params", u)) { }
        else
            return;
        let array_assertion_error;
        try {
            sup.assert_array.assert(u.params);
            return;
        }
        catch (e) {
            if (e instanceof err_1.AxelTypeError) {
                array_assertion_error = e;
            }
            else {
                throw e;
            }
        }
        let object_assertion_error;
        try {
            sup.assert_object.assert(u.params);
            return;
        }
        catch (e) {
            if (e instanceof err_1.AxelTypeError) {
                object_assertion_error = e;
            }
            else {
                throw e;
            }
        }
        throw new err_1.AxelTypeError([
            "Tried to assert that value was of type EIP_1193.RequestArguments.",
            "The value satisfied {method: string} but was unable to satisfy",
            "{params?: readonly unknown[] | object}.",
            object_assertion_error,
            array_assertion_error,
        ]);
    },
    typename: "EIP_1193.RequestArguments",
};
exports.assert_ProviderConnectInfo = {
    assert(u) {
        sup.assert_object.assert(u);
        sup.object_has_t("chainId", hex_string_1.assert_hex_string, u);
        void null;
    },
    typename: "EIP_1193.ProviderConnectInfo",
};
exports.assert_ProviderRpcError = {
    assert(u) {
        if (u instanceof Error) { }
        else {
            throw new err_1.AxelTypeError([
                "A ProviderRpcError must extend Error!",
            ]);
        }
        sup.object_has_t("code", sup.assert_number, u);
        void null;
    },
    typename: "EIP_1193.ProviderRpcError",
};
exports.assert_EIP_1193_Provider = {
    assert(u) {
        try {
            sup.assert_object.assert(u);
        }
        catch (e) {
            if (e instanceof err_1.AxelTypeError) {
                throw new err_1.AxelTypeError([
                    "An error was encountered while validating the provider:",
                    e,
                ]);
            }
            else {
                throw e;
            }
        }
        // for a true assertion, we should be checking that it has at least one of
        // request, send, or sendAsync. But we're only using send so I don't want
        // objects with only request on it to be counted.
        try {
            sup.object_has("request", u);
        }
        catch (e) {
            throw new err_1.AxelTypeError([
                "While a provider without a .request method can technically be valid",
                "so long as it has either one of a .send or a .sendAsync method.",
                "This sdk makes extensive use of the .request method and therefore will not",
                "allow you to pass in this provider, even if it *may* technically be valid.",
                "See https://eips.ethereum.org/EIPS/eip-1193",
            ]);
        }
        sup.object_optional_t("isMetaMask", sup.assert_bool, u);
        sup.object_optional_t("isCoinbaseWallet", sup.assert_bool, u);
        sup.object_$in_t("on", sup.assert_any_fn, u);
        sup.object_$in_t("removeListener", sup.assert_any_fn, u);
        sup.object_$in_t("request", sup.assert_any_fn, u);
        void null;
    },
    typename: "EIP_1193_Provider",
};
