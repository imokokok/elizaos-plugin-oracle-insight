import { verifyAttestation } from '../insightClient.js';
import { getPluginContext } from '../pluginContext.js';
function isRecord(value) {
    return typeof value === 'object' && value !== null;
}
export const verifyAttestationAction = {
    name: 'INSIGHT_VERIFY_ATTESTATION',
    description: 'Verify an Insight pre-trade safety attestation (EIP-712) against the published Insight ' +
        'attester via the free POST /api/v1/safety/attestation/verify endpoint. Pass the attestation ' +
        'JSON as options.attestation.',
    similes: ['VERIFY_SAFETY_ATTESTATION', 'VERIFY_ORACLE_ATTESTATION'],
    validate: async (_runtime, message, _state) => {
        const text = (message.content?.text ?? '').toLowerCase();
        return text.includes('attestation') && text.includes('insight');
    },
    handler: async (runtime, message, _state, options, callback) => {
        void runtime;
        void message;
        const context = getPluginContext();
        if (!context) {
            const text = 'Insight plugin is not initialized.';
            if (callback)
                await callback({ text });
            return { success: false, text };
        }
        const opt = options && typeof options === 'object' ? options : {};
        const optParams = isRecord(opt.params) ? opt.params : {};
        let attestation = opt.attestation ?? optParams.attestation;
        if (!attestation) {
            const fromChecks = context.lastChecks.find((entry) => entry.outcome.attestation);
            attestation = fromChecks?.outcome.attestation;
        }
        if (!attestation) {
            const text = 'No attestation to verify. Run INSIGHT_PRE_TRADE_CHECK first or pass the attestation JSON via options.attestation.';
            if (callback)
                await callback({ text });
            return { success: false, text };
        }
        try {
            const result = await verifyAttestation(context.settings, attestation);
            const text = result.valid
                ? 'Insight attestation VERIFIED: signature recovers to the published attester and is within its validity window.'
                : `Insight attestation NOT verified: ${JSON.stringify(result.detail).slice(0, 400)}`;
            if (callback)
                await callback({ text });
            return { success: true, text, data: result };
        }
        catch (error) {
            const text = error instanceof Error
                ? `Attestation verification failed: ${error.message}`
                : 'Attestation verification failed.';
            if (callback)
                await callback({ text });
            return { success: false, text };
        }
    },
    examples: [],
};
