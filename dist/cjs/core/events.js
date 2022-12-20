"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert_event_name = exports.event_names = void 0;
const sup = require("./sup");
exports.event_names = [
    "provider_connect",
    "provider_disconnect",
    "accounts_update",
    "chain_update",
];
sup.object_freeze(exports.event_names);
exports.assert_event_name = sup.tuple_make_assert_in(exports.event_names, "event_name");
