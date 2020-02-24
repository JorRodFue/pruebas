const axios = require('axios')
const https = require('https')
let request = require('request').defaults({ rejectUnauthorized: false });
require('tls').DEFAULT_MIN_VERSION = 'TLSv1'
const fs = require('fs')




const baseurl = 'https://www.bmsupermercados.es';

var agent = new https.Agent({
    // host: URL_HOST,
    port: '443',
    path: '/',
    rejectUnauthorized: false,
    requestCert: false,   //add when working with https sites
    agent: false   //add when working with https sites

});



var options = {
    url: baseurl,
    agent: agent
};

request(baseurl
    , (res) => { console.log(res) })

// axios.get(baseurl).then(res => console.log(res))

const login = '07253055M'
const password = 'Yudonpay12'
const Cookie = 'acepta_cookies_bm_2019=si; PHPSESSID=6qrmovseku51l4ppde9edv2e33; '

axios.post('https://www.bmsupermercados.es/login.htm', {

    usuario: login,
    clave: password,
    // lang: '1',
    konektatu: '1',
    conectar: '',
    llave_form_login: '8b68463a4cff052a8d202dc4832b65133d6fea4785864c058e9a93a815e05b04',
}, {
    headers: {
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Sec-Fetch-Dest': 'document',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        Cookie: Cookie,
        host: 'www.bmsupermercados.es',
        'Cache-Control': 'no-cache,'

    }
}
).then(res => {

    console.log(res.data)
    fs.writeFileSync('response.txt', res.data)
}

)
    .then(() => axios.get('https://www.bmsupermercados.es/saldo-tarjeta.htm', { headers: { Cookie: Cookie } })).then(res => {

        console.log(res.data)
        fs.writeFileSync('puntos.txt', res.data)
    })

