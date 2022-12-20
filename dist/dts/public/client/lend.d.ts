import type { hex_string } from "../hex_string";
import type { actions_info } from "../actions";
import type { protocols_of } from "../protocols";
import type { AxelClientInstance } from "../client";
import type { two1_req_full, two1_req_partial } from "./two1";
type endpoint = "lend";
type action_class = actions_info[endpoint]["action_class"];
type allowed_protocols = protocols_of<action_class>;
export type full_lend_request = two1_req_full<allowed_protocols>;
export type partial_lend_request = two1_req_partial<allowed_protocols>;
export type lend = {
    (this: AxelClientInstance, opts: full_lend_request): Promise<hex_string[]>;
};
export type safe_lend = {
    (this: AxelClientInstance, opts: partial_lend_request): Promise<hex_string[]>;
};
export {};
