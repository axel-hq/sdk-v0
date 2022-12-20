import { AxelCoreClient } from "../client";
import { hex_string } from "../hex_string";
import { uint } from "../sup";
export declare class transaction_looker {
    client: AxelCoreClient;
    tx_hash: hex_string;
    poll_rate: uint;
    constructor(client: AxelCoreClient, tx_hash: hex_string, poll_rate?: uint);
    wait(): Promise<any>;
}
