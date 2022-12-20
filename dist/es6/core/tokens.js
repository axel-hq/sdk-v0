import * as sup from "./sup";
export const tokens_info = {
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
sup.object_freeze(tokens_info);
export const tokens = sup.object_keys(tokens_info);
export const assert_token = sup.tuple_make_assert_in(tokens, "token");
export const native_tokens = sup.object_filter_keys_by_prop(tokens_info, "type", "native");
export const redemption_tokens = sup.object_filter_keys_by_prop(tokens_info, "redemption", true);
export const erc20_tokens = sup.object_filter_keys_by_prop(tokens_info, "type", "erc20");
// NOTE(Marcus): assuming this vvvv is NOTE(Cole)
// this could be more typesafe
// it would be nice if we could verify that the mainnet of each testnet has the
// same token as the testnet
// not now though
export const internet_to_native_token = {
    ethereum: "ETH",
    kovan: "ETH",
    rinkeby: "ETH",
    ropsten: "ETH",
    goerli: "ETH",
};
sup.object_freeze(internet_to_native_token);
