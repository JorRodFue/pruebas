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
    await page.goto('https://www.eltenedor.es/#')
    await page.setDefaultNavigationTimeout(0);

    await page.screenshot({ path: 'preCaptcha.png', fullPage: true })

    await page.waitFor(1000)
    for (const frame of page.mainFrame().childFrames()) {
        // Attempt to solve any potential reCAPTCHAs in those frames
        console.log(frame)
        await frame.solveRecaptchas()
        console.log("despues de solveRecaptchas")
    }

    // /const selector = '#cboxOverlay'
    // await page.waitForSelector(selector)
    // await page.evaluate((selector) => {
    //     document.querySelector('#cboxOverlay').setAttribute('display', 'visibility: hidden')
    // });

    await page.waitFor(2000)
    await page.screenshot({ path: 'postCaptcha.png', fullPage: true })


    // page.mainFrame().childFrames()

    // That's it, a single line of code to solve reCAPTCHAs 🎉

    // // await Promise.all([
    // //     page.waitForNavigation(),
    // //     // page.click(`#recaptcha-demo-submit`)
    // ])
    await page.waitFor(2000)

    await page.goto('https://www.eltenedor.es/#')
    // await page.click('#header-login')
    if (await page.$('#cboxClose') !== null) await page.click('#cboxClose')
    await page.waitFor(2000)


    if (await page.$("#header-login") !== null) await page.click("#header-login")

    await page.waitFor(2000)

    await page.screenshot({ path: 'postLoginClick.png', fullPage: true })
    // await browser.close()
})