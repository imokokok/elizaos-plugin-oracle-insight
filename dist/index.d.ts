import type { Plugin } from '@elizaos/core';
import { preTradeCheckAction } from './actions/preTradeCheck.js';
import { verifyAttestationAction } from './actions/verifyAttestation.js';
import { insightProvider } from './provider.js';
declare const insightPlugin: Plugin;
export default insightPlugin;
export { insightPlugin };
export { preTradeCheckAction, verifyAttestationAction, insightProvider };
