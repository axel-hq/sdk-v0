import { sleep } from "../util";
import { check_provider } from "../providers/util";
import { default_poll_rate } from "../defaults";
// TODO(Cole): Safe version of this
export class transaction_looker {
    constructor(client, tx_hash, poll_rate = default_poll_rate) {
        this.client = client;
        this.tx_hash = tx_hash;
        this.poll_rate = poll_rate;
    }
    async wait() {
        while (true) { // <──────────────────────────────────────┐
            check_provider(this.client); // │
            const res = await this.client.provider.request({
                "method": "eth_getTransactionReceipt",
                "params": [this.tx_hash], // │
            }); // │
            if (res == null) { // │
                await sleep(this.poll_rate); // │
                continue; // >─────────────────────────────────────┘
            }
            return res;
        }
    }
}
