import { F } from "@axel-hq/foundatsion";
import { ethers } from "ethers";
import { AxelTypeError } from "./err";
import * as sup from "./sup";
import { json_stringify } from "./util";
function generate_request_fn(private_key, rpc_url) {
    const rpc_provider = new ethers.providers.JsonRpcProvider(rpc_url);
    const signer = new ethers.Wallet(private_key, rpc_provider);
    async function request(args) {
        sup.assert_object.assert(args);
        sup.object_has_t("method", sup.assert_string, args);
        let params = [];
        if (sup.object_hop("params", args)) {
            sup.object_has_t("params", sup.assert_array, args);
            params = args.params;
        }
        if (args.method === "eth_sendTransaction") {
            const tx = params[0];
            sup.assert_object.assert(tx);
            return (await signer.sendTransaction(tx)).hash;
        }
        else if (args.method === "eth_signTransaction") {
            const tx = params[0];
            sup.assert_object.assert(tx);
            // NOTE(Marcus): This one might cause problems in the future
            return await signer.signTransaction(tx);
        }
        else {
            const body = {
                jsonrpc: "2.0",
                id: "0",
                method: args.method,
                params: params,
            };
            const response = await fetch(rpc_url, {
                method: "POST",
                body: json_stringify(body),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (F.oo.is(data.error)) {
                F.oo.assert_field_is(data.error, "code", F.number);
                F.oo.assert_field_is(data.error, "message", F.string);
                if (data.error.data !== undefined) {
                    throw new F.Error("RPC error:\n", `Code: ${data.error.code}\n`, `Message: ${data.error.message}\n`, `Data: ${JSON.stringify(data.error.data)}`);
                }
                else {
                    throw new F.Error("RPC error:\n", `Code: ${data.error.code}\n`, `Message: ${data.error.message}`);
                }
            }
            else {
                // exit try-catch block
                return data.result;
            }
        }
    }
    return request;
}
export class Provider {
    constructor(private_key, rpc_url) {
        if (rpc_url === undefined || typeof rpc_url === "string") { }
        else {
            throw new AxelTypeError([
                "Argument rpc_url must be a string!",
                `Was instead ${sup.dbg_str(rpc_url)}`,
            ]);
        }
        this.private_key = private_key;
        const interal_rpc_url = rpc_url !== null && rpc_url !== void 0 ? rpc_url : "api.axel.dev/v1/rpc";
        this.rpc_url = interal_rpc_url;
        this.request = generate_request_fn(private_key, interal_rpc_url);
    }
    on(event_name, fn) { }
    removeListener(event_name, fn) {
        return true;
    }
}
