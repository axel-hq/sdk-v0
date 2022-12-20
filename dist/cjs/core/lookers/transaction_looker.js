"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transaction_looker = void 0;
const util_1 = require("../util");
const util_2 = require("../providers/util");
const defaults_1 = require("../defaults");
// TODO(Cole): Safe version of this
class transaction_looker {
    constructor(client, tx_hash, poll_rate = defaults_1.default_poll_rate) {
        this.client = client;
        this.tx_hash = tx_hash;
        this.poll_rate = poll_rate;
    }
    async wait() {
        while (true) { // <──────────────────────────────────────┐
            (0, util_2.check_provider)(this.client); // │
            const res = await this.client.provider.request({
                "method": "eth_getTransactionReceipt",
                "params": [this.tx_hash], // │
            }); // │
            if (res == null) { // │
                await (0, util_1.sleep)(this.poll_rate); // │
                continue; // >─────────────────────────────────────┘
            }
            return res;
        }
    }
}
exports.transaction_looker = transaction_looker;
