const requestService = require('../../robots/robots/src/services/request.service')

const testUrl = 'https://expediente.chedraui.com.mx/api/expedientes/santiagoclub8@gmail.com'

requestService.get(testUrl, { rejectUnauthorized: false })
    .then((results) => console.log(results))
    .catch(err => console.log(err))


console.log(null || 0)

// const options = {
//     url: testUrl,
//     strictSSL: false,
//     secureProtocol: 'TLSv1_method'
// }

// request.get(options, async function (error, response, body) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(body);
//     }
// })