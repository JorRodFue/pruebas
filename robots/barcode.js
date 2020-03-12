const JavascriptBarcodeReader = require('javascript-barcode-reader');
const tesseract = require("node-tesseract-ocr");


JavascriptBarcodeReader({
    /* Image file Path || {data: Uint8ClampedArray, width, height} || HTML5 Canvas ImageData */
    image: 'shellclubsmartBarcode1583858844278.png',
    barcodeType: 'industrial',
    barcode: 'ean-13',
    options: {
        useAdaptiveThreshold: true, // for images with sahded portions
        singlePass: true
    }
}).then(code => {
    console.log(code)
}).catch(err => {
    console.log(err)
})

// const config = {
//     lang: "eng",
//     oem: 1,
//     psm: 3,
// }

// tesseract.recognize('costa.png', config)
//     .then(text => {
//         console.log("Result:", text)
//     })
//     .catch(error => {
//         console.log(error.message)
//     })