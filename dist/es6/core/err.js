var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _AxelError_lines;
export class AxelError extends Error {
    constructor(entries) {
        const lines = [""];
        for (const e of entries) {
            if (e instanceof AxelError) {
                for (const subline of __classPrivateFieldGet(e, _AxelError_lines, "f")) {
                    lines.push(`> > ${subline}`);
                }
            }
            else {
                lines.push(`> ${e}`);
            }
        }
        super(lines.join("\n"));
        _AxelError_lines.set(this, void 0);
        __classPrivateFieldSet(this, _AxelError_lines, lines, "f");
    }
}
_AxelError_lines = new WeakMap();
export class AxelTypeError extends AxelError {
    constructor(lines) {
        super(lines);
    }
}
