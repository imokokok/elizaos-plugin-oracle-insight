import type { PreTradeOutcome } from './insightClient.js';
import type { ParsedCheckRequest } from './parseRequest.js';
/**
 * Shared per-process plugin state: the resolved settings, the optional paid
 * fetch, and the most recent check results the provider surfaces into agent
 * state. Ephemeral by design — nothing is persisted.
 */
export interface PluginContext {
    settings: import('./settings.js').InsightSettings;
    paidFetch: typeof fetch | null;
    lastChecks: Array<{
        request: ParsedCheckRequest;
        outcome: PreTradeOutcome;
        at: string;
    }>;
    recordCheck: (request: ParsedCheckRequest, outcome: PreTradeOutcome) => void;
}
export declare function createPluginContext(settings: import('./settings.js').InsightSettings, paidFetch: typeof fetch | null): PluginContext;
export declare function setPluginContext(context: PluginContext): void;
export declare function getPluginContext(): PluginContext | undefined;
