export function sleep(milliseconds) {
    return new Promise(res => { setTimeout(res, milliseconds); });
}
export function json_stringify(a) {
    return JSON.stringify(a);
}
