

const url = ELTENEDOR_BASE_URL = "https://www.eltenedor.es/"

global.config = require('../robots/robots/src/config/config');
global.config.browser.headless = !true; //true, no mostrar la pantalla
global.config.browser.devtools = true;
global.config.proxy.enabled = !true;
global.config.proxy.port = 24002;

const { anticaptchaKey: key } = require('../robots/robots/src/config/config');


const createBrowser = require('../robots/robots/src/services/browser.service');

const eltenedor = {
  loginUrl: `${ELTENEDOR_BASE_URL}/`,
  pointsUrl: `${ELTENEDOR_BASE_URL}/mi-cuenta/yums`,
  nameUrl: `${ELTENEDOR_BASE_URL}/mi-cuenta/datos`,
  updateTime: 24,
}

const loginUrl = eltenedor.loginUrl


const selectors = {
  loginForm:
  {
    modalClose: '#cboxClose',
    loginButton: '#header-login',
    userInput: '#inputEmail',
    buttonExistsUser: '#login_form > div.connectionAuthLogin-submitGroup.form-group > button',
    passwordInput: '#register-password',
    buttonCheckLogin: '#auth_password_form > div.smartConnectAuthPassword-submitGroup.form-group > button',
    loginOk: 'body > div:nth-child(2) > header > div.header > div > div.pull-right > nav.header-account.header-menu > div.header-menuTitle.header-menuTitle--myAccount > a',
  },
  userInfo:
  {
    points: 'body > div:nth-child(2) > main > div > div > div.profile-content > div > div.loyaltyMyYumsContainer > div.loyaltyDiscountProgress > div.loyaltyDiscountProgress-layer.loyaltyDiscountProgress-layer--centerInline > div > span',
    name: '#la_fourchette_customer_subscribe_type_firstName',
    surname: '#la_fourchette_customer_subscribe_type_lastName',
  },
};

const club = {
  name: 'Yums',
  currency: 'Puntos',
};

const getPoints = async (browser, page) => {
  await page.goto(pointsUrl);

  await page.waitFor(800);

  const value = await browser.findElement(selectors.userInfo.points);

  if (value.length === 0) {
    throw new UnexpectedError(syncError.common);
  }

  return value.trim();
};

const getName = async (browser, page) => {
  await page.goto('https://www.eltenedor.es/');
  await page.waitFor(800);

  const name = await browser.getAttributeOf(selectors.userInfo.name, 'value');
  const surname = await browser.getAttributeOf(selectors.userInfo.surname, 'value');

  if (name.length === 0
    && surname.length === 0) {
    throw new UnexpectedError(syncError.common);
  }

  const value = `${name} ${surname}`;

  return value.trim();
};

const getData = async (browser, page) => {
  const points = await getPoints(browser, page);
  const name = await getName(browser, page);

  return { name, points };
};

const doLogin = async (login, password, reqID = null, merchant = null, browser, page) => {
  await page.goto(loginUrl);
  console.log("goto Done")
  await page.waitFor(8000);
  console.log(selectors.loginForm.modalClose)
  await page.solveRecaptchas()

  // if (await browser.elementVisible(selectors.loginForm.modalClose)) {
  //   await browser.waitAndClick(selectors.loginForm.modalClose);
  // }

  await page.waitFor(2000);
  await page.solveRecaptchas()
  await page.waitFor(2000);


  // await browser.waitAndClick(selectors.loginForm.loginButton);
  // await browser.waitAndType(selectors.loginForm.userInput, login);
  // await browser.waitAndClick(selectors.loginForm.buttonExistsUser);

  // await page.waitFor(2000);

  // await browser.waitAndType(selectors.loginForm.passwordInput, password);
  // await browser.waitAndClick(selectors.loginForm.buttonCheckLogin);

  // await page.waitFor(2000);

  // try {
  //   const loginOk = await browser.findElement(selectors.loginForm.loginOk);

  //   if (loginOk) {
  //     log.info(`${reqID} ${merchant} SYNC Login OK`);
  //   } else {
  //     throw new RobotError(syncError.wrongCredentials);
  //   }
  // } catch (err) {
  //   throw new RobotError(syncError.wrongCredentials);
  // }
};

const getInfo = async (login, password, reqID, merchant, browser) => {
  const page = await browser.createPage();

  await page.setViewport({ width: 2000, height: 800 });

  await page.waitFor(1500);

  await doLogin(login, password, reqID, merchant, browser, page);

  return getData(browser, page);
};

const isRecentlyUpdated = (updatedAt) => {
  const d = new Date();

  d.setHours(d.getHours() - updateTime);

  return updatedAt.getTime() > d.getTime();
};

async function saveOrUpdate(user, resultInfo, login, newPassword) {
  const saveUser = Object.assign({}, user);

  if (user) {
    if (!await authService.isValidPassword(newPassword, user.password)) {
      saveUser.password = await authService.hashPassword(newPassword);
    }

    await Repository.update(
      {
        ...saveUser,
        ...resultInfo,
      },
    );
  } else {
    await Repository.save(
      {
        ...resultInfo,
        login,
        password: await authService.hashPassword(newPassword),
      },
    );
  }
}

const response = (data, reqID) => (
  {
    members: [memberModel({ fullName: data.name, id: reqID })],
    cards: [cardModel({ number: '', type: club.name })],
    balances: [balanceModel({ amount: data.points, description: club.currency })],
  });



const merchant = { id: 'ELTENEDOR', domain: eltenedor, code: 'R096' }


const user = "tarjetasrewards@gmail.com"
const password = "Yudonpay123"

console.log("key vale", key)
const puppeteer = require('puppeteer-extra')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')

puppeteer.use(RecaptchaPlugin({
  provider: {
    id: '2captcha',
    token: 'a68d59058912a27711f1ea51886dfb4c'
  },
  visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
})
)

const StealthPlugin = require('puppeteer-extra-plugin-stealth')

// puppeteer.use(StealthPlugin())

puppeteer.launch({ headless: false })
  .then(async (browser) => {
    const page = await browser.newPage();
    await page.goto(loginUrl)
    await page.waitFor(12000)
    let { captchas, error } = await page.findRecaptchas()
    console.log(captchas)
    // let { solutions, error } = await page.getRecaptchaSolutions(captchas)
    // let { solved, error } = await page.enterRecaptchaSolutions(solutions)
    await page.solveRecaptchas()
    // doLogin(user, password, null, null, browser, page)

    // login, password, reqID, merchant, browser, page

  })
  .catch(error => console.log(error))

module.exports = {
  getInfo: async (login, password, reqID, merchant) => {
    const browser = createBrowser(reqID, merchant, 'getInfo');
    try {
      const user = await Repository.findOne(login);
      if (user
        && isRecentlyUpdated(user.updatedAt)
        && await authService.isValidPassword(password, user.password)) {
        log.info(`${reqID} ${merchant} SYNC used cache data`);
        return response(user, reqID);
      }
      const data = await getInfo(login, password, reqID, merchant, browser);
      await saveOrUpdate(user, data, login, password);
      browser.close();
      return response(data, reqID);
    } catch (err) {
      browser.manageError(err);
      throw err;
    }
  },
};

