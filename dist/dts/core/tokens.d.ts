import * as sup from "./sup";
import { internet } from "./chains";
export declare const tokens_info: {
    readonly ETH: {
        readonly type: "native";
    };
    readonly WETH: {
        readonly type: "erc20";
        readonly redemption: false;
    };
    readonly USDC: {
        readonly type: "erc20";
        readonly redemption: false;
    };
    readonly aWETH: {
        readonly type: "erc20";
        readonly redemption: true;
    };
    readonly cETH: {
        readonly type: "erc20";
        readonly redemption: true;
    };
    readonly rETH: {
        readonly type: "erc20";
        readonly redemption: true;
    };
    readonly stETH: {
        readonly type: "erc20";
        readonly redemption: true;
    };
    readonly yWETH: {
        readonly type: "erc20";
        readonly redemption: true;
    };
    readonly aUSDC: {
        readonly type: "erc20";
        readonly redemption: true;
    };
    readonly cUSDC: {
        readonly type: "erc20";
        readonly redemption: true;
    };
};
export type tokens_info = typeof tokens_info;
export declare const tokens: readonly ("ETH" | "WETH" | "USDC" | "aWETH" | "cETH" | "rETH" | "stETH" | "yWETH" | "aUSDC" | "cUSDC")[];
export type token = keyof typeof tokens_info;
export declare const assert_token: sup.assert_obj<token>;
export declare const native_tokens: readonly "ETH"[];
export type native_token = "ETH";
export declare const redemption_tokens: readonly ("aWETH" | "cETH" | "rETH" | "stETH" | "yWETH" | "aUSDC" | "cUSDC")[];
export type redemption_token = "aWETH" | "cETH" | "rETH" | "stETH" | "yWETH" | "aUSDC" | "cUSDC";
export declare const erc20_tokens: readonly ("WETH" | "USDC" | "aWETH" | "cETH" | "rETH" | "stETH" | "yWETH" | "aUSDC" | "cUSDC")[];
export type erc20_token = "WETH" | "USDC" | "aWETH" | "cETH" | "rETH" | "stETH" | "yWETH" | "aUSDC" | "cUSDC";
export declare const internet_to_native_token: {
    [chain in internet]: native_token;
};
