import { good_provider } from "../providers/util";
import { AxelCoreClient } from "../client";
import { RequestArguments } from "../providers/EIP_1193";
import { chain, internet } from "../chains";
import { hex_string } from "../hex_string";
import { protocol } from "../protocols";
export declare function check_protocol(protocol: protocol, chain: chain, internet: internet, what: string): void;
export declare function send_to_provider(client: AxelCoreClient & good_provider, wanted_chain: chain, provider_rpc_request: RequestArguments): Promise<hex_string>;
