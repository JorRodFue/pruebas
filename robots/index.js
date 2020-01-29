//sheinMX.sync


global.config = require('../../robots/robots/src/config/config');
global.config.browser.headless = !true; //true, no mostrar la pantalla
global.config.browser.devtools = !true;
global.config.browser.args = []

global.config.proxy.enabled = !true;
global.config.proxy.ip = 'luminatipm.yudonpay.com';
global.config.proxy.port = 24005;
global.config.proxy.residentialPort = 24010;
global.config.mongo.uri = 'mongodb://hulkusu:OzhUdFPgcLuf4XpM@bs657485-001.dbaas.ovh.net:35190/apiusers';
global.config.anticaptchaKey = 'a68d59058912a27711f1ea51886dfb4c';
require('../../robots/robots/src/config/db');
// const repository = require('../../robots/robots/src/repository/global/shein.repository');
const repository = require('../../robots/robots/src/repository/global/vueling.repository');

repository.findOne = () => false;
repository.save = () => false;
repository.update = () => false;
// const { getInfo, oneClick } = require('../../robots/robots/src/domain/mx/shein.domain.js');
const { getInfo, oneClick } = require('../../robots/robots/src/domain/mx/vueling.domain.js');

const reqID = 'testing_desig';
// const merchant = 'SHEIN';
const merchant = 'VUELING';

const logins =  [
  {
    login: 'tarjetasrewards@gmail.com',
    password: 'Ar01022015',
  },

  {login: 'tarjetasrewards@gmail.com',
  password: 'Yudonpay#Mola2018.',}


];
const rngIndex = Math.floor(Math.random()*logins.length);
const { login, password, data } = logins[1];
(async () => {

  try {
    console.log("ok");
    config.browser={}
    console.log(config.browser)

    const resultInfo = await getInfo(login, password, reqID, merchant);
    // const resultInfo = await oneClick(login, password, reqID, merchant, data);
    console.log(resultInfo);
  }catch(err){
    console.log(err);
  }
})();