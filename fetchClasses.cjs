const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.goto('http://10.78.54.203:3001/', { waitUntil: 'networkidle0' });

        // Extract className of root > div
        const classes = await page.evaluate(() => {
            const rootDiv = document.querySelector('#root > div');
            const navDiv = document.querySelector('nav > div');
            const heroSection = document.querySelector('section');

            return {
                root: rootDiv ? rootDiv.className : null,
                nav: navDiv ? navDiv.className : null,
                hero: heroSection ? heroSection.className : null
            };
        });

        console.log(JSON.stringify(classes, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await browser.close();
    }
})();
