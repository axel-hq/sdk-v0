import * as shared from "./shared";
import { fetch } from "cross-fetch";
import { json_stringify } from "../util";
import { AxelError, AxelTypeError } from "../err";
export async function get(endpoint, key, args) {
    // NOTE(Marcus): Once to_query_string accepts null, refactor into const expr
    let query_string;
    // NOTE(Marcus): cursed use of loose equals
    // should use args ?? {} instead
    if (args != null) {
        query_string = shared.to_query_string(args);
    }
    else {
        query_string = "";
    }
    const url = `${shared.api_base}/${endpoint}${query_string}`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "X-API-KEY": key,
            "User-Agent": "@axel-hq/sdk",
        },
    });
    const data = await res.json();
    try {
        shared.assert_basic_response.assert(data);
    }
    catch (e) {
        // NOTE(Marcus): This line assumes that AxelTypeError is thrown from
        // assert_basic_response.assert for only one reason
        if (e instanceof AxelTypeError) {
            throw new AxelError([
                "This is probably not your fault.",
                "The server has returned an object which did not have a .status key of type string.",
                "Regardless of the http status response, all valid endpoints should conform",
                "to this response structure.",
                "Please contact the Axel developers immediately with this error message.",
                `url  = ${url}`,
                `data = ${json_stringify(data)}`,
                e,
            ]);
        }
        else {
            throw e;
        }
    }
    if (res.status < 100) {
        throw new AxelError([
            "This is probably not your fault.",
            `The server responded with ${res.status}. Is that even possible?`,
            "Well, if you're seeing this, something quite wrong has happened.",
            "Please contact the Axel developers with this error message.",
            `url  = ${url}`,
            `data = ${json_stringify(data)}`,
        ]);
    }
    if (res.status < 200) {
        throw new AxelError(["Unable to handle 1xx http responses."]);
    }
    if (res.status < 300) {
        // 2XX, good request result
        if (data.status === "error") {
            throw new AxelError([
                "This is probably not your fault.",
                `The status of the request is ${res.status} but the server returned`,
                "a response where status = \"error\". This does not make sense.",
                "Please contact the Axel developers with this error message.",
                `url  = ${url}`,
                `data = ${json_stringify(data)}`,
            ]);
        }
        return data; // <-------------------------------------- only happy path
    }
    if (res.status < 400) {
        throw new AxelError(["Unable to handle 3xx http responses."]);
    }
    if (res.status < 500) {
        if (data.status === "error") {
            throw new AxelError([
                `${res.status} ${res.statusText}`,
                data.error,
            ]);
        }
        throw new AxelError([
            "This is probably not your fault.",
            `The status of the request is ${res.status} but the server returned`,
            "a response where status = \"error\". This does not make sense.",
            "Please contact the Axel developers with this error message.",
            `url  = ${url}`,
            `data = ${json_stringify(data)}`,
        ]);
    }
    if (res.status < 600) {
        if (data.status === "error") {
            throw new AxelError([
                `${res.status} ${res.statusText}`,
                data.error,
            ]);
        }
        throw new AxelError([
            "This is probably not your fault.",
            `The status of the request is ${res.status} but the server returned`,
            `a response where status = "${data.status}". This does not make sense.`,
            "Please contact the Axel developers with this error message.",
            `url  = ${url}`,
            `data = ${json_stringify(data)}`,
        ]);
    }
    // 600+ error codes do not exist
    throw new AxelError([`Unable to handle http code ${res.status}!`]);
}
// What's the difference between GET and POST?
// Not much except that the error messages for POST include the body of the
// request. I really don't think it's a good idea to abstract over both of these
// and make some stupid general request function. You'd have to parameterize
// the error generation and therefore local variables. Don't do it.
export async function post(endpoint, key, body) {
    const url = `${shared.api_base}/${endpoint}`;
    const res = await fetch(url, {
        method: "POST",
        body: json_stringify(body),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-API-KEY": key,
            "User-Agent": "@axel-hq/sdk",
        },
    });
    const data = await res.json();
    try {
        shared.assert_basic_response.assert(data);
    }
    catch (e) {
        // NOTE(Marcus): This line assumes that AxelTypeError is thrown from
        // assert_basic_response.assert for only one reason
        if (e instanceof AxelTypeError) {
            throw new AxelError([
                "This is probably not your fault.",
                "The server has returned an object which did not have a .status key of type string.",
                "Regardless of the http status response, all valid endpoints should conform",
                "to this response structure.",
                "Please contact the Axel developers immediately with this error message.",
                `url  = ${url}`,
                `body = ${json_stringify(body)}`,
                `data = ${json_stringify(data)}`,
                e,
            ]);
        }
        else {
            throw e;
        }
    }
    if (res.status < 100) {
        throw new AxelError([
            "This is probably not your fault.",
            `The server responded with ${res.status}. Is that even possible?`,
            "Well, if you're seeing this, something quite wrong has happened.",
            "Please contact the Axel developers with this error message.",
            `url  = ${url}`,
            `body = ${json_stringify(body)}`,
            `data = ${json_stringify(data)}`,
        ]);
    }
    if (res.status < 200) {
        throw new AxelError(["Unable to handle 1xx http responses."]);
    }
    if (res.status < 300) {
        // 2XX, good request result
        if (data.status === "error") {
            throw new AxelError([
                "This is probably not your fault.",
                `The status of the request is ${res.status} but the server returned`,
                "a response where status = \"error\". This does not make sense.",
                "Please contact the Axel developers with this error message.",
                `url  = ${url}`,
                `body = ${json_stringify(body)}`,
                `data = ${json_stringify(data)}`,
            ]);
        }
        return data; // <-------------------------------------- only happy path
    }
    if (res.status < 400) {
        throw new AxelError(["Unable to handle 3xx http responses."]);
    }
    if (res.status < 500) {
        if (data.status === "error") {
            throw new AxelError([
                `${res.status} ${res.statusText}`,
                data.error,
            ]);
        }
        throw new AxelError([
            "This is probably not your fault.",
            `The status of the request is ${res.status} but the server returned`,
            "a response where status = \"error\". This does not make sense.",
            "Please contact the Axel developers with this error message.",
            `url  = ${url}`,
            `body = ${json_stringify(body)}`,
            `data = ${json_stringify(data)}`,
        ]);
    }
    if (res.status < 600) {
        if (data.status === "error") {
            throw new AxelError([
                `${res.status} ${res.statusText}`,
                data.error,
            ]);
        }
        throw new AxelError([
            "This is probably not your fault.",
            `The status of the request is ${res.status} but the server returned`,
            `a response where status = "${data.status}". This does not make sense.`,
            "Please contact the Axel developers with this error message.",
            `url  = ${url}`,
            `body = ${json_stringify(body)}`,
            `data = ${json_stringify(data)}`,
        ]);
    }
    // 600+ error codes do not exist
    throw new AxelError([`Unable to handle http code ${res.status}!`]);
}
