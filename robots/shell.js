
global.config = require('../../robots/robots/src/config/config');
global.config.browser.headless = !true; //true, no mostrar la pantalla
global.config.browser.devtools = true;
global.config.browser.args = ['--disable-web-security']

global.config.proxy.enabled = true;
global.config.proxy.ip = 'luminatipm.yudonpay.com';
global.config.proxy.port = 24002;
//para UK 24003
// para SP 24002
// para MX 24005

global.config.proxy.residentialPort = 24010;
// global.config.mongo.uri = 'mongodb://hulkusu:OzhUdFPgcLuf4XpM@bs657485-001.dbaas.ovh.net:35190/apiusers';
global.config.mongo.uri = 'mongodb://127.0.0.1:27017/robots';


global.config.anticaptchaKey = 'a68d59058912a27711f1ea51886dfb4c';
require('../../robots/robots/src/config/db');
const repository = require('../../robots/robots/src/repository/sp/shellclubsmart.repository');

repository.findOne = () => false;
repository.save = () => false;
repository.update = () => false;

const { getInfo, oneClick } = require('../../robots/robots/src/domain/sp/shellclubsmart');

const reqID = "testing_desig";

const merchant = 'SHELLCLUBSMART';

const credentials = {
  login: '44010093F', password: 'Enmedio1973'
};
const { login, password } = credentials;

(async () => {
  try {
    console.log("ok");
    config.browser = {}
    console.log(config.browser)
    console.log("voy a hacer un getInfo con", login, password, reqID, merchant)
    const resultInfo = await getInfo(login, password, reqID, merchant);
    // const resultInfo = await oneClick(login, password, reqID, merchant, data);
    console.log("Tenemos Get Info", resultInfo);
  } catch (err) {
    console.log("Error en el index.js", err);
  }
})();