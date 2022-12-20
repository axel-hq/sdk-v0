"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internet_to_native_token = exports.erc20_tokens = exports.redemption_tokens = exports.native_tokens = exports.assert_token = exports.tokens = exports.tokens_info = void 0;
const sup = require("./sup");
exports.tokens_info = {
    ETH: { type: "native" },
    WETH: { type: "erc20", redemption: false },
    USDC: { type: "erc20", redemption: false },
    aWETH: { type: "erc20", redemption: true },
    cETH: { type: "erc20", redemption: true },
    rETH: { type: "erc20", redemption: true },
    stETH: { type: "erc20", redemption: true },
    yWETH: { type: "erc20", redemption: true },
    aUSDC: { type: "erc20", redemption: true },
    cUSDC: { type: "erc20", redemption: true },
};
void null;
sup.object_freeze(exports.tokens_info);
exports.tokens = sup.object_keys(exports.tokens_info);
exports.assert_token = sup.tuple_make_assert_in(exports.tokens, "token");
exports.native_tokens = sup.object_filter_keys_by_prop(exports.tokens_info, "type", "native");
exports.redemption_tokens = sup.object_filter_keys_by_prop(exports.tokens_info, "redemption", true);
exports.erc20_tokens = sup.object_filter_keys_by_prop(exports.tokens_info, "type", "erc20");
// NOTE(Marcus): assuming this vvvv is NOTE(Cole)
// this could be more typesafe
// it would be nice if we could verify that the mainnet of each testnet has the
// same token as the testnet
// not now though
exports.internet_to_native_token = {
    ethereum: "ETH",
    kovan: "ETH",
    rinkeby: "ETH",
    ropsten: "ETH",
    goerli: "ETH",
};
sup.object_freeze(exports.internet_to_native_token);
