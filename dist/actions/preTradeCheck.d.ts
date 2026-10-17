import type { IAgentRuntime, Memory, State } from '@elizaos/core';
export declare const preTradeCheckAction: {
    name: string;
    description: string;
    similes: string[];
    routingHint: string;
    validate: (_runtime: IAgentRuntime, message: Memory, _state?: State) => Promise<boolean>;
    handler: (runtime: IAgentRuntime, message: Memory, _state?: State, options?: Record<string, unknown>, callback?: (response: {
        text: string;
    }) => Promise<Memory[] | void>) => Promise<{
        success: boolean;
        text: string;
        data?: Record<string, unknown>;
    }>;
    examples: ({
        name: string;
        content: {
            text: string;
            action?: undefined;
        };
    } | {
        name: string;
        content: {
            text: string;
            action: string;
        };
    })[][];
};
