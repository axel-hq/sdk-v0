import * as sup from "./sup";
export const event_names = [
    "provider_connect",
    "provider_disconnect",
    "accounts_update",
    "chain_update",
];
sup.object_freeze(event_names);
export const assert_event_name = sup.tuple_make_assert_in(event_names, "event_name");
