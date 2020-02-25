const axios = require('axios')
const https = require('https')
let request = require('request')
// require('tls').DEFAULT_MIN_VERSION = 'TLSv1'
const fs = require('fs')

const qs = require('querystring')

const url = 'https://www.bmsupermercados.es/login.htm'

const login = '07253055M'
const password = 'Yudonpay12'
const Cookie = 'PHPSESSID=cqart3nun23480hrg8ltaf6kim;'

const requestBody = {
    usuario: login,
    clave: password,
    // lang: '1',
    // conectar: '',
    konektatu: '1',
    // llave_form_login: 'f17034f24b3a5fe35b770dcb788fe3a8b6c2f62912aed16895517acfb95116c1',
}

const config = {
    headers: {
        'Cookie': 'acepta_cookies_bm_2019=si',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

axios.post(url, qs.stringify(requestBody), config)
    .then((result) => {
        fs.writeFileSync('axiosLogin.txt', result.data)
        cookie = (result.headers['set-cookie'][0].split(' ')[0])


        axios.get('https://www.bmsupermercados.es/saldo-tarjeta.htm', {
            headers: {
                Host: 'www.bmsupermercados.es',
                'User-Agent': 'Mozilla/ 5.0(Windows NT 10.0; Win64; x64; rv: 73.0) Gecko / 20100101 Firefox / 73.0',
                'Accept': 'text / html, application / xhtml + xml, application / xml; q = 0.9, image / webp',
                'Accept-Language': 'es - ES, es; q = 0.8, en - US; q = 0.5, en; q = 0.3',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.bmsupermercados.es/login.htm',
                Connection: 'keep-alive',
                'Cookie': 'acepta_cookies_bm_2019=si;' + cookie,
                'Upgrade-Insecure-Requests': '1',
                'Cache-Control': 'max - age=0',
            }
        }
        )
            .then((res) => fs.writeFileSync('axiosPoints.txt', res.data))

    })
    .catch((err) => {
        // Do somthing
    })




// var agent = new https.Agent({
//     // host: URL_HOST,
//     port: '443',
//     path: '/',
//     rejectUnauthorized: false,
//     requestCert: false,   //add when working with https sites
//     agent: false   //add when working with https sites

// });



// var options = {
//     url: baseurl,
//     agent: agent
// };



// request({ method: 'GET', uri: baseUrl, json: true }, (err, res, body) => {
//     // console.log(res.body)


//     fs.writeFileSync('primerGET.txt', res.body)
//     // console.log(res.headers)
// })

// axios.get(baseurl).then(res => {
//     console.log(res)

//     fs.writeFileSync('primerGET.txt', res.data)
// })



// axios.post('https://www.bmsupermercados.es/login.htm', {


//     {
//         headers: {
//             'Upgrade-Insecure-Requests': '1',
//             'DNT': '1',
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Sec-Fetch-Dest': 'document',
//             Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//             Cookie: Cookie,
//             host: 'www.bmsupermercados.es',
//             'Cache-Control': 'no-cache,'

//         }
//     }
// ).then(res => {

//     // console.log(res.data)
//     fs.writeFileSync('response.txt', res.data)
// })

// )
//     .then(() => axios.get('https://www.bmsupermercados.es/saldo-tarjeta.htm', { headers: { Cookie: Cookie } })).then(res => {

//         console.log(res.data)
//         fs.writeFileSync('puntos.txt', res.data)
//     })

