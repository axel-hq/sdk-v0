"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json_stringify = exports.sleep = void 0;
function sleep(milliseconds) {
    return new Promise(res => { setTimeout(res, milliseconds); });
}
exports.sleep = sleep;
function json_stringify(a) {
    return JSON.stringify(a);
}
exports.json_stringify = json_stringify;
