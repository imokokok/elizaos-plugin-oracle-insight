import type { InsightSettings } from './settings.js';
export interface PreTradeQuery {
    asset: string;
    chainId: number;
    action: string;
    tradeAmountUsd?: number;
    destinationAsset?: string;
}
export interface PreTradeOutcome {
    verdict: string;
    reasonCodes: string[];
    warnings: string[];
    attestation: unknown;
    paymentSettled: boolean;
    paymentNetwork?: string;
    raw: unknown;
}
export interface InsightRequestError extends Error {
    status?: number;
    paymentRequired?: boolean;
    accepts?: unknown;
}
export declare function buildPreTradeUrl(baseUrl: string, query: PreTradeQuery): string;
/**
 * Build a fetch that transparently settles x402 v2 payment challenges from the
 * configured key. Returns null when no key is configured; callers then fall
 * back to a plain fetch and surface the 402 to the agent with setup guidance.
 */
export declare function buildPaidFetch(settings: InsightSettings): typeof fetch | null;
export declare function parsePreTradeResponse(body: unknown, paymentSettled: boolean, paymentNetwork?: string): PreTradeOutcome;
export declare function runPreTrade(settings: InsightSettings, query: PreTradeQuery, paidFetch: typeof fetch | null): Promise<PreTradeOutcome>;
export interface AttestationVerifyResult {
    valid: boolean;
    detail: unknown;
}
/** Free endpoint: verify an EIP-712 pre-trade attestation signature + window. */
export declare function verifyAttestation(settings: InsightSettings, attestation: unknown): Promise<AttestationVerifyResult>;
