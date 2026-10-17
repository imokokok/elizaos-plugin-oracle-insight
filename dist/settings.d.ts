/**
 * Plugin configuration resolved from the agent runtime settings with
 * process-env fallbacks. All keys are optional except the base URL, which has
 * a production default.
 */
export declare const DEFAULT_BASE_URL = "https://www.oracleinsight.xyz";
/** EVM networks the plugin can pay from via the exact EIP-3009 scheme.
 *
 * BNB Smart Chain (eip155:56) is deliberately absent: Insight's BNB settlement
 * uses the AEON facilitator mandate flow (no on-chain EIP-3009), which the
 * stock @x402/evm client scheme does not sign. Agents that need to pay on BNB
 * should pay from another supported network or use the Insight MCP endpoint
 * with an x402-capable wallet plugin.
 */
export declare const PAYABLE_NETWORKS: readonly ["eip155:84532", "eip155:8453", "eip155:1", "eip155:10", "eip155:42161", "eip155:137", "eip155:43114", "eip155:1329", "eip155:196", "eip155:143"];
export declare const DEFAULT_PAYABLE_NETWORKS: readonly string[];
/** Oracle coverage chain ids accepted by /api/v1/safety/pre-trade. */
export declare const CHAIN_IDS: Record<string, number>;
export interface InsightSettings {
    baseUrl: string;
    x402PrivateKey: string | null;
    payableNetworks: readonly string[];
}
type RuntimeLike = {
    getSetting?: (key: string) => string | number | boolean | null | undefined;
};
export declare function resolveSettings(runtime: RuntimeLike): InsightSettings;
export {};
