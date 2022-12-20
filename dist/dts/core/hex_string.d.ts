import * as sup from "./sup";
export type hex_string = sup.newtype<"hex_string", `0x${string}`>;
export declare const assert_hex_string: sup.assert_obj<hex_string>;
export declare function from(s: sup.unwrap<hex_string>): hex_string;
export declare function hex_string_to_uint(h: hex_string): sup.uint;
export declare function hex_string_to_ufloat(int: hex_string, decimals: sup.uint): sup.ufloat;
