import type { if_in_browser } from "./sup";
import type { EIP_1193_Provider } from "./providers/EIP_1193";
import type { AxelClientInstance } from "./client";
export type browser_connect = {
    (this: AxelClientInstance, ethereum?: EIP_1193_Provider): Promise<void>;
};
export type server_connect = {
    (this: AxelClientInstance, ethereum: EIP_1193_Provider): Promise<void>;
};
export type connect_provider = if_in_browser<browser_connect, server_connect>;
