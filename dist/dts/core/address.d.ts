import * as sup from "./sup";
import { hex_string } from "./hex_string";
export type address = sup.newtype<"address", hex_string>;
export declare const assert_address: sup.assert_obj<address>;
