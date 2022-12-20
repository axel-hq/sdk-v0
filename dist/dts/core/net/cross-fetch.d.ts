import * as shared from "./shared";
import { api_key } from "../api_key";
export declare function get(endpoint: string, key: api_key, args?: shared.query_args): Promise<shared.basic_response_good>;
export declare function post(endpoint: string, key: api_key, body: object): Promise<shared.basic_response_good>;
