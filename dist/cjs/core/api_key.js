"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert_api_key = void 0;
const err_1 = require("./err");
const read_the_docs = "Consider reviewing the docs at docs.axel.dev/types/api_key";
const key_types = {
    t: "test",
    u: "user",
};
const version = "1";
exports.assert_api_key = {
    assert(u) {
        if (typeof u !== "string") {
            throw new err_1.AxelTypeError([
                "API Key was not of type string!",
                "Your api key is a string beginning with 'axl'.",
                "If you don't have one yet, you can get one in the 'API Keys'",
                "section of the Axel dashboard.",
                read_the_docs,
            ]);
        }
        if (u.slice(0, 3) !== "axl") {
            throw new err_1.AxelTypeError([
                `Could not cast "${u}" to api_key`,
                "Your api key must begin with 'axl'.",
                read_the_docs,
            ]);
        }
        const key_type = u[3];
        if (Object.keys(key_types).includes(key_type)) { }
        else {
            throw new err_1.AxelTypeError([
                "Unrecognized key type!",
                `${u.slice(0, 4)} <- '${key_type}'`,
                "If you copied this directly from the dashboard, your SDK may be too old!",
                "Perhaps the server has been updated with a new key type. This is quite unlikely, though.",
                "There are two supported API key types:",
                "t - test",
                "u - user",
            ]);
        }
        if (u[4] !== "-") {
            throw new err_1.AxelTypeError([
                "Expected a hyphen/dash after Axel key identifier!",
                `${u}`,
                "    ^ < < < expected a hyphen there",
            ]);
        }
        if (u[5] !== version) {
            throw new err_1.AxelTypeError([
                `This SDK only supports version ${version} key types!`,
            ]);
        }
    },
    typename: "api_key",
};
