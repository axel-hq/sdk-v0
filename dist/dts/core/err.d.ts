type error_entry = string | AxelError;
export declare class AxelError extends Error {
    #private;
    constructor(entries: error_entry[]);
}
export declare class AxelTypeError extends AxelError {
    constructor(lines: error_entry[]);
}
export {};
