export interface ParsedCheckRequest {
    asset: string;
    chainId: number;
    action: string;
    tradeAmountUsd?: number;
    destinationAsset?: string;
}
/**
 * Resolve the check parameters from structured action options first, then from
 * free-form message text ("check ETH/USDC on base before swapping $500").
 */
export declare function parseCheckRequest(options: Record<string, unknown> | undefined, messageText: string): ParsedCheckRequest | {
    error: string;
};
/** Render the outcome as compact agent-readable text (verdict + machine facts). */
export declare function formatPreTradeText(request: ParsedCheckRequest, outcome: {
    verdict: string;
    reasonCodes: string[];
    warnings: string[];
    paymentSettled: boolean;
}): string;
