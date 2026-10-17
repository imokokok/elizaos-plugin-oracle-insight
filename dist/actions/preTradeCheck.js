import { runPreTrade } from '../insightClient.js';
import { formatPreTradeText, parseCheckRequest } from '../parseRequest.js';
import { getPluginContext } from '../pluginContext.js';
export const preTradeCheckAction = {
    name: 'INSIGHT_PRE_TRADE_CHECK',
    description: 'Check whether the price a trade relies on is trustworthy via Insight (oracleinsight.xyz): ' +
        'multi-provider oracle consensus, oracle-manipulation-aware verdict PASS/WARN/BLOCK, ' +
        'EIP-712 attestation. Costs 0.02 USDC per check via x402 when a payment key is configured.',
    similes: ['CHECK_ORACLE_SAFETY', 'PRE_TRADE_SAFETY', 'ORACLE_SAFETY_CHECK'],
    routingHint: 'price/oracle trust check before signing a trade -> INSIGHT_PRE_TRADE_CHECK; ' +
        'general market data or charts -> other tools (NOT this action)',
    validate: async (_runtime, message, _state) => {
        const text = (message.content?.text ?? '').toLowerCase();
        return /oracle|price .{0,20}(safe|trust|manipul)|pre.?trade|safety check|check .{0,60}(pair|price)/.test(text);
    },
    handler: async (runtime, message, _state, options, callback) => {
        void runtime;
        const context = getPluginContext();
        if (!context) {
            const text = 'Insight plugin is not initialized.';
            if (callback)
                await callback({ text });
            return { success: false, text };
        }
        const parsed = parseCheckRequest(options, message.content?.text ?? '');
        if ('error' in parsed) {
            if (callback)
                await callback({ text: parsed.error });
            return { success: false, text: parsed.error };
        }
        try {
            const outcome = await runPreTrade(context.settings, parsed, context.paidFetch);
            context.recordCheck(parsed, outcome);
            const text = formatPreTradeText(parsed, outcome);
            if (callback)
                await callback({ text });
            return { success: true, text, data: outcome };
        }
        catch (error) {
            const text = error instanceof Error ? `Insight check failed: ${error.message}` : 'Insight check failed.';
            if (callback)
                await callback({ text });
            return { success: false, text };
        }
    },
    examples: [
        [
            {
                name: '{{user1}}',
                content: {
                    text: 'I am about to swap 50000 USDC for WETH on base — is the price safe right now?',
                },
            },
            {
                name: '{{agent}}',
                content: {
                    text: 'Running an Insight oracle-safety check…',
                    action: 'INSIGHT_PRE_TRADE_CHECK',
                },
            },
        ],
    ],
};
