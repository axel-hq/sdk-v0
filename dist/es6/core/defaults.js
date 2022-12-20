import { gas_priorities } from "./gas_priority";
import { max_slippage_percent_from } from "./max_slippage_percent";
import { uint_from } from "./sup";
export const default_poll_rate = uint_from(100);
export const default_minutes_timeout = uint_from(30);
export const default_gas_priority = gas_priorities.medium;
export const default_max_slippage_percent = max_slippage_percent_from(1);
