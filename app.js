const puppeteerExtra = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');

const stealthPlugin = pluginStealth();

module.exports.lambdaHandler = async (event, context) => {
    puppeteerExtra.use(stealthPlugin);
    const browser = await puppeteerExtra.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '/opt/chrome/chrome'
    });
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    console.log(await page.title());
    await browser.close();
};