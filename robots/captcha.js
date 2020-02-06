const puppeteer = require('puppeteer-extra')

// add recaptcha plugin and provide it your 2captcha token (= their apiKey)
// 2captcha is the builtin solution provider but others would work as well.
// Please note: You need to add funds to your 2captcha account for this to work
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(
    RecaptchaPlugin({
        provider: {
            id: '2captcha',
            token: 'a68d59058912a27711f1ea51886dfb4c'

        },
        visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
    })
).use(StealthPlugin())

// puppeteer usage as normal
puppeteer.launch({ headless: !false }).then(async browser => {
    const page = await browser.newPage()
    await page.goto('https://www.eltenedor.es/')
    await page.setDefaultNavigationTimeout(0);

    await page.waitFor(5000)
    await page.solveRecaptchas()

    page.mainFrame().childFrames()
    for (const frame of page.mainFrame().childFrames()) {
        // Attempt to solve any potential reCAPTCHAs in those frames
        console.log(frame)

        await frame.solveRecaptchas()
        console.log(frame)
        console.log("despues de solveRecaptchas")

    }
    console.log('captcha solved')
    // That's it, a single line of code to solve reCAPTCHAs 🎉

    // // await Promise.all([
    // //     page.waitForNavigation(),
    // //     // page.click(`#recaptcha-demo-submit`)
    // ])
    await page.waitFor(5000)

    await page.screenshot({ path: 'response.png', fullPage: true })
    // await browser.close()
})