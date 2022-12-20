import * as key from "./api_key";
import * as err from "./err";
import * as put from "./providers/util";
import * as evf from "./event_framework";
// client
import * as egg from "./client/estimate_gas";
import * as swp from "./client/swap";
import * as apy from "./client/get_apy";
import * as bal from "./client/get_balance";
import * as swr from "./client/get_swap_rate";
import * as gsp from "./client/get_gas_price";
// two
import * as brw from "./client/borrow";
import * as dps from "./client/yield";
import * as lnd from "./client/lend";
import * as stk from "./client/stake";
import * as ubr from "./client/unborrow";
import * as udp from "./client/unyield";
import * as uld from "./client/unlend";
export function AxelCoreClient(api_key) {
    if (new.target) { }
    else {
        throw new err.AxelTypeError([
            "You must instantiate AxelClientInstance (AxelCoreClient internally)",
            "using 'new'!",
            "",
            'const {Client} = require("@axel-hq/sdk");',
            'const axel = new Client("axlu-1-your-api-key")',
            "             ~~~",
            "Did you forget this?",
        ]);
    }
    key.assert_api_key.assert(api_key);
    this.api_key = api_key;
    this.provider = null;
    evf.instantiate_event_framework(this);
}
/* -`, performance `,- */
// any typesafety so that people don't forget to add methods to the prototype?
// hah! nope! get boned!
// just don't screw up, type safety is for morons anyways
// - Cole
AxelCoreClient.prototype.get_accounts = put.get_accounts;
AxelCoreClient.prototype.get_account = put.get_account;
AxelCoreClient.prototype.get_chain_id = put.get_chain_id;
AxelCoreClient.prototype.get_chain = put.get_chain;
AxelCoreClient.prototype.unsafe_estimate_gas = egg.estimate_gas;
AxelCoreClient.prototype.estimate_gas = egg.safe_estimate_gas;
AxelCoreClient.prototype.unsafe_swap = swp.swap;
AxelCoreClient.prototype.swap = swp.safe_swap;
AxelCoreClient.prototype.unsafe_get_apy = apy.get_apy;
AxelCoreClient.prototype.get_apy = apy.safe_get_apy;
AxelCoreClient.prototype.unsafe_get_balance = bal.get_balance;
AxelCoreClient.prototype.get_balance = bal.safe_get_balance;
AxelCoreClient.prototype.unsafe_get_swap_rate = swr.get_swap_rate;
AxelCoreClient.prototype.get_swap_rate = swr.safe_get_swap_rate;
AxelCoreClient.prototype.unsafe_get_gas_price = gsp.get_gas_price;
AxelCoreClient.prototype.get_gas_price = gsp.safe_get_gas_price;
AxelCoreClient.prototype.unsafe_borrow = brw.borrow;
AxelCoreClient.prototype.borrow = brw.safe_borrow;
AxelCoreClient.prototype.unsafe_yield = dps.yielԁ;
AxelCoreClient.prototype.yield = dps.safe_yield;
AxelCoreClient.prototype.unsafe_lend = lnd.lend;
AxelCoreClient.prototype.lend = lnd.safe_lend;
AxelCoreClient.prototype.unsafe_stake = stk.stake;
AxelCoreClient.prototype.stake = stk.safe_stake;
AxelCoreClient.prototype.unsafe_unborrow = ubr.unborrow;
AxelCoreClient.prototype.unborrow = ubr.safe_unborrow;
AxelCoreClient.prototype.unsafe_unyield = udp.unyield;
AxelCoreClient.prototype.unyield = udp.safe_unyield;
AxelCoreClient.prototype.unsafe_unlend = uld.unlend;
AxelCoreClient.prototype.unlend = uld.safe_unlend;
