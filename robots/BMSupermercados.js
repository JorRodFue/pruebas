
global.config = require('../../robots/robots/src/config/config');
global.config.browser.headless = false; //true, no mostrar la pantalla
global.config.browser.devtools = true;
global.config.browser.args = ['--disable-web-security']

global.config.proxy.enabled = true;
global.config.proxy.ip = 'luminatipm.yudonpay.com';
global.config.proxy.port = 24002;
// para UK 24003
// para SP 24002
// para MX 24005
global.config.proxy.residentialPort = 24002;
global.config.mongo.uri = 'mongodb://hulkusu:OzhUdFPgcLuf4XpM@bs657485-001.dbaas.ovh.net:35190/apiusers';
global.config.anticaptchaKey = 'a68d59058912a27711f1ea51886dfb4c';
require('../../robots/robots/src/config/db');
const repository = require('../../robots/robots/src/repository/sp/bmsupermercados.repository');

// repository.findOne = () => false;
// repository.save = () => false;
// repository.update = () => false;
const { getInfo, oneClick } = require('../../robots/robots/src/domain/sp/bmsupermercados.domain');

const reqID = "testing_desig";
const merchants = ['BMSUPERMERCADOS', 'SHEIN', 'VUELING', 'PERFUMESHOP', 'CHEDRAUIMX', 'ELTENEDOR', 'KIKO'];
let currentMerchant = 0;
const merchant = merchants[currentMerchant];
console.log("MERCHANT", merchant)

const logins =
{
  BMSUPERMERCADOS: { login: '07253055M', password: 'Yudonpay12' },
  SHEIN: {
    login: 'tarjetasrewards@gmail.com', password: 'Ar01022015'
  },
  ELTENEDOR: {
    login: 'tarjetasrewards@gmail.com', password: 'Yudonpay123'
  },
};
const { login, password, data } = logins[merchant];
(async () => {
  try {
    console.log("ok");
    config.browser = {}
    console.log(config.browser)
    console.log("voy a hacer un getInfo con", login, password, reqID, merchant)
    const resultInfo = await getInfo(login, password, reqID, merchant, 'sp');
    // const resultInfo = await oneClick(login, password, reqID, merchant, data);
    console.log("Tenemos Get Info", resultInfo);
  } catch (err) {
    console.log("Error en el index.js", err);
  }
})();