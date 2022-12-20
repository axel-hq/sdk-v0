import * as sup from "../sup";
export type query_args = {
    [key in string]: string;
};
export declare function to_query_string(args: query_args): string;
export declare const api_base = "https://api.axel.dev/v1";
export type basic_response_good = {
    status: "success" | "continue";
};
export type basic_response_bad = {
    status: "error";
    error: string;
};
export type basic_response = basic_response_good | basic_response_bad;
export declare const assert_basic_response: sup.assert_obj<basic_response>;
