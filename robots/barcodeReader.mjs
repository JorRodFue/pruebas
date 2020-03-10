// import javascriptBarcodeReader from 'javascript-barcode-reader'

import { javascriptBarcodeReader } from 'javascript-barcode-reader'

javascriptBarcodeReader({
    /* Image file Path || {data: Uint8ClampedArray, width, height} || HTML5 Canvas ImageData */
    image: 'exampleWhite.png',
    barcode: 'ean-13',
    // barcodeType: 'industrial',
    options: {
        // useAdaptiveThreshold: true // for images with sahded portions
        // singlePass: true
    }
})
    .then(code => {

        console.log('hola', code)
    })
    .catch(err => {
        console.log(err)
    })