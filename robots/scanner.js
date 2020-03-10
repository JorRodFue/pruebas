const { MultiFormatReader, BarcodeFormat } = require('@zxing/library/esm5'); // use this path since v0.5.1

const hints = new Map();
const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.DATA_MATRIX/*, ...*/];

hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

const reader = new MultiFormatReader();

reader.setHints(hints);

const luminanceSource = new RGBLuminanceSource(imgWidth, imgHeight, imgByteArray);
const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));

reader.decode(binaryBitmap);