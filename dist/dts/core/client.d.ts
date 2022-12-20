import * as key from "./api_key";
import * as evt from "./events";
import * as pvr from "./providers/EIP_1193";
import * as put from "./providers/util";
import * as egg from "./client/estimate_gas";
import * as swp from "./client/swap";
import * as apy from "./client/get_apy";
import * as bal from "./client/get_balance";
import * as swr from "./client/get_swap_rate";
import * as gsp from "./client/get_gas_price";
import * as brw from "./client/borrow";
import * as dps from "./client/yield";
import * as lnd from "./client/lend";
import * as stk from "./client/stake";
import * as ubr from "./client/unborrow";
import * as udp from "./client/unyield";
import * as uld from "./client/unlend";
export interface AxelCoreClient {
    api_key: key.api_key;
    provider: pvr.EIP_1193_Provider | null;
    on: evt.on;
    off: evt.off;
    connect_provider: evt.connect_provider;
    readonly get_accounts: typeof put.get_accounts;
    readonly get_account: typeof put.get_account;
    readonly get_chain_id: typeof put.get_chain_id;
    readonly get_chain: typeof put.get_chain;
    readonly unsafe_estimate_gas: typeof egg.estimate_gas;
    readonly estimate_gas: typeof egg.safe_estimate_gas;
    readonly unsafe_swap: typeof swp.swap;
    readonly swap: typeof swp.safe_swap;
    readonly unsafe_get_apy: typeof apy.get_apy;
    readonly get_apy: typeof apy.safe_get_apy;
    readonly unsafe_get_balance: typeof bal.get_balance;
    readonly get_balance: typeof bal.safe_get_balance;
    readonly unsafe_get_swap_rate: typeof swr.get_swap_rate;
    readonly get_swap_rate: typeof swr.safe_get_swap_rate;
    readonly unsafe_get_gas_price: typeof gsp.get_gas_price;
    readonly get_gas_price: typeof gsp.safe_get_gas_price;
    readonly unsafe_borrow: typeof brw.borrow;
    readonly borrow: typeof brw.safe_borrow;
    readonly unsafe_yield: typeof dps.yielԁ;
    readonly yield: typeof dps.safe_yield;
    readonly unsafe_lend: typeof lnd.lend;
    readonly lend: typeof lnd.safe_lend;
    readonly unsafe_stake: typeof stk.stake;
    readonly stake: typeof stk.safe_stake;
    readonly unsafe_unborrow: typeof ubr.unborrow;
    readonly unborrow: typeof ubr.safe_unborrow;
    readonly unsafe_unyield: typeof udp.unyield;
    readonly unyield: typeof udp.safe_unyield;
    readonly unsafe_unlend: typeof uld.unlend;
    readonly unlend: typeof uld.safe_unlend;
}
export declare function AxelCoreClient(this: AxelCoreClient, api_key: unknown): void;