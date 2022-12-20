import * as sup from "./sup";
declare const key_types: {
    readonly t: "test";
    readonly u: "user";
};
declare const version: "1";
type version = typeof version;
type oldtype = `axl${keyof typeof key_types}-${version}-${string}`;
export type api_key = sup.newtype<"api_key", oldtype>;
export declare const assert_api_key: sup.assert_obj<api_key>;
export {};
