export function createPluginContext(settings, paidFetch) {
    const lastChecks = [];
    return {
        settings,
        paidFetch,
        lastChecks,
        recordCheck(request, outcome) {
            lastChecks.unshift({ request, outcome, at: new Date().toISOString() });
            if (lastChecks.length > 5)
                lastChecks.length = 5;
        },
    };
}
export function setPluginContext(context) {
    globalThis.__insightPluginContext = context;
}
export function getPluginContext() {
    return globalThis.__insightPluginContext;
}
