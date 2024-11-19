/**
 * Expose a function to the page if it does not exist
 *
 * NOTE:
 * Rewrite it to 'upsertFunction' after updating Puppeteer to 20.6 or higher
 * using page.removeExposedFunction
 * https://pptr.dev/api/puppeteer.page.removeExposedFunction
 *
 * @param {import(puppeteer).Page} page
 * @param {string} name
 * @param {Function} fn
 */
async function exposeFunctionIfAbsent(page, name, fn) {
    const exist = await page.evaluate((name) => {
        return !!window[name];
    }, name);
    if (exist) {
        debugLog(`Função ${name} já está registrada.`);
        return;
    }
    debugLog(`Registrando função ${name}.`);
    await page.exposeFunction(name, fn);
}

function debugLog(msg) {
    if (process.env.WW_DEBUG === 'true') {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} [WW_DEBUG] ${msg}`);
    }
}

module.exports = { exposeFunctionIfAbsent };
