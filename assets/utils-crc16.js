const CRC_POLY_16 = 0xA001;
const CRC_START_16 = 0x0001;

let crcTab16Init = false;
let crcTab16 = new Array(256);

function initCrc16Tab() {
    for (let i = 0; i < 256; i++) {
        let crc = 0;
        let c = i;
        for (let j = 0; j < 8; j++) {
            if ((crc ^ c) & 1) crc = (crc >> 1) ^ CRC_POLY_16;
            else crc = crc >> 1;
            c = c >> 1;
        }
        crcTab16[i] = crc;
    }
    crcTab16Init = true;
}

function crc16(inputStr) {
    if (!crcTab16Init) initCrc16Tab();
    let crc = CRC_START_16;
    for (let a = 0; a < inputStr.length; a++) {
        crc = (crc >> 8) ^ crcTab16[(crc ^ inputStr.charCodeAt(a)) & 0x00FF];
    }
    return crc;
}
