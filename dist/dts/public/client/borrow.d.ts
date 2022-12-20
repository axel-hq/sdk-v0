import type { hex_string } from "../hex_string";
import type { actions_info } from "../actions";
import type { protocols_of } from "../protocols";
import type { AxelClientInstance } from "../client";
import type { two1_req_full, two1_req_partial } from "./two1";
type endpoint = "borrow";
type action_class = actions_info[endpoint]["action_class"];
type allowed_protocols = protocols_of<action_class>;
export type full_borrow_request = two1_req_full<allowed_protocols>;
export type partial_borrow_request = two1_req_partial<allowed_protocols>;
export type borrow = {
    (this: AxelClientInstance, opts: full_borrow_request): Promise<hex_string[]>;
};
export type safe_borrow = {
    (this: AxelClientInstance, opts: partial_borrow_request): Promise<hex_string[]>;
};
export {};
