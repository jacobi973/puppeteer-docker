const puppeteerExtra = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const puppeteer = require('puppeteer');


const stealthPlugin = pluginStealth();

module.exports.lambdaHandler = async (event, context) => {
    console.log('Starting Puppeteer');
    console.log('Event: ', event);
    puppeteerExtra.use(stealthPlugin);
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--allow-pre-commit-input',
            '--disable-background-networking',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-client-side-phishing-detection',
            '--disable-component-extensions-with-background-pages',
            '--disable-component-update',
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            '--disable-extensions',
            '--disable-hang-monitor',
            '--disable-ipc-flooding-protection',
            '--disable-popup-blocking',
            '--disable-prompt-on-repost',
            '--disable-renderer-backgrounding',
            '--disable-sync',
            '--enable-automation',
            '--enable-blink-features=IdleDetection',
            '--export-tagged-pdf',
            '--force-color-profile=srgb',
            '--metrics-recording-only',
            '--no-first-run',
            '--password-store=basic',
            '--use-mock-keychain',
            '--disable-domain-reliability',
            '--disable-print-preview',
            '--disable-speech-api',
            '--disk-cache-size=33554432',
            '--mute-audio',
            '--no-default-browser-check',
            '--no-pings',
            '--single-process',
            '--disable-features=Translate,BackForwardCache,AcceptCHFrame,MediaRouter,OptimizationHints,AudioServiceOutOfProcess,IsolateOrigins,site-per-process',
            '--enable-features=NetworkServiceInProcess2,SharedArrayBuffer',
            '--hide-scrollbars',
            '--ignore-gpu-blocklist',
            '--in-process-gpu',
            '--window-size=1920,1080',
            '--use-gl=angle',
            '--allow-running-insecure-content',
            '--disable-setuid-sandbox',
            '--disable-site-isolation-trials',
            '--disable-web-security',
            '--no-sandbox',
            '--no-zygote',
            '--headless=new',
          ],
        executablePath: '/opt/chrome/chrome',
    });
    console.log('Browser started');

    const page = await browser.newPage();
    console.log('Page created');
    await page.goto('https://www.google.com');
    console.log(await page.title());
    await browser.close();
};
