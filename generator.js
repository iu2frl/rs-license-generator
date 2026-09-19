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

const options = [
    { name: "SME32|33|36", active: false, desc: "Unknown opt" },
    { name: "SME42|43|46", active: false, desc: "Enables B41, B42, B43" },
    { name: "SM-B5", active: true, desc: "FM/PM Modulator" },
    { name: "SME-B31", active: false, desc: "Unknown opt" },
    { name: "SME-B32", active: false, desc: "Unknown opt" },
    { name: "SME-B41", active: false, desc: "SME-B41 FLEX" },
    { name: "SME-B42", active: false, desc: "SME-B42 POCSAG" },
    { name: "SME-B43", active: false, desc: "SME-B43 REFLEX" },
    { name: "SMIQ03", active: false, desc: "Generator Model" },
    { name: "SMIQ03B", active: false, desc: "Generator Model" },
    { name: "SMIQ03HD", active: false, desc: "Generator Model" },
    { name: "SMIQ04B", active: false, desc: "Generator Model" },
    { name: "SMIQ06B", active: false, desc: "Generator Model" },
    { name: "SMIQB10", active: true, desc: "Modulation coder (requires hardware board)" },
    { name: "SMIQB11", active: true, desc: "Data generator (requires hardware board)" },
    { name: "SMIQB12", active: true, desc: "Memory extension for data generator (requires hardware board)" },
    { name: "SMIQB14", active: true, desc: "Fading simulator (requires hardware board)" },
    { name: "SMIQB15", active: true, desc: "Second fading simulator (requires hardware board)" },
    { name: "SMIQB17", active: true, desc: "Noise generator and distortion simulator (requires hardware board)" },
    { name: "SMIQB20", active: true, desc: "Modulation coder (requires hardware board)" },
    { name: "SMIQB21", active: true, desc: "Bit error rate test" },
    { name: "SMIQB42", active: true, desc: "Digital Standard IS-95 CDMA" },
    { name: "SMIQB43", active: true, desc: "Digital Standard WCDMA NTT DoCoMo 1.0 / ARIB 0.0" },
    { name: "SMIQB45", active: true, desc: "Digital Standard WCDMA 3GPP (FDD)" },
    { name: "SMIQB47", active: true, desc: "Low ACP for IS-95 CDMA and W-CDMA" },
    { name: "SMIQB48", active: true, desc: "Extended Functions for WCDMA (3GPP)" },
    { name: "SMIQB49", active: true, desc: "Extended Fading Functions for WCDMA (3GPP)" },
    { name: "SMIQB50", active: true, desc: "Fast CPU" },
    { name: "SMIQB51", active: true, desc: "GPS emulator" },
    { name: "SMIQB21", active: true, desc: "BER measurement" },
    { name: "SMIQB60", active: true, desc: "Arbitrary Waveform Generator incl. R&S WinIQSIM" },
    { name: "SMIQK8", active: true, desc: "TETRA T1 Simulator" },
    { name: "SMIQK08", active: true, desc: "TETRA T1 Simulator" },
    { name: "SMIQK11", active: true, desc: "Digital Standard IS-95 CDMA" },
    { name: "SMIQK12", active: true, desc: "Digital Standard cdma2000" },
    { name: "SMIQK13", active: true, desc: "Digital Standard WCDMA TDD Mode (3GPP)" },
    { name: "SMIQK14", active: true, desc: "Digital Standard TD-SCDMA" },
    { name: "SMIQK15", active: true, desc: "OFDM Signal Generation, HIPERLAN/2" },
    { name: "SMIQK16", active: true, desc: "Digital Standard IEEE 802.11b" },
    { name: "SMIQK17", active: true, desc: "Digital Standard 1xEV-DO" },
    { name: "SMIQK18", active: true, desc: "Digital Standard IEEE 802.11a" },
    { name: "SMIQK19", active: true, desc: "802.11 Wireless LAN" },
    { name: "SMIQK20", active: true, desc: "3GPP FTD Inclusive HSDPA" },
];

function encrypt(option, serial, isSmiq) {
    const prefix = isSmiq ? "SMIQ" : "SM3";
    let keyString = prefix;
    let charCounter = prefix.length;
    let loopCounter = 0;
    let ptr = 0;

    while (loopCounter < 0x10 && ptr < serial.length) {
        const ch = serial[ptr];
        if (ch !== ' ') {
            keyString += ch;
            charCounter++;
        }
        ptr++;
        loopCounter++;
    }

    keyString += option;
    const crc = crc16(keyString);
    return crc * 0x0D;
}

// --- RC2 / ARC2 block cipher (RFC 2268), used by the CMU200 key derivation ---
const RC2_PITABLE = [
    0xd9,0x78,0xf9,0xc4,0x19,0xdd,0xb5,0xed,0x28,0xe9,0xfd,0x79,0x4a,0xa0,0xd8,0x9d,
    0xc6,0x7e,0x37,0x83,0x2b,0x76,0x53,0x8e,0x62,0x4c,0x64,0x88,0x44,0x8b,0xfb,0xa2,
    0x17,0x9a,0x59,0xf5,0x87,0xb3,0x4f,0x13,0x61,0x45,0x6d,0x8d,0x09,0x81,0x7d,0x32,
    0xbd,0x8f,0x40,0xeb,0x86,0xb7,0x7b,0x0b,0xf0,0x95,0x21,0x22,0x5c,0x6b,0x4e,0x82,
    0x54,0xd6,0x65,0x93,0xce,0x60,0xb2,0x1c,0x73,0x56,0xc0,0x14,0xa7,0x8c,0xf1,0xdc,
    0x12,0x75,0xca,0x1f,0x3b,0xbe,0xe4,0xd1,0x42,0x3d,0xd4,0x30,0xa3,0x3c,0xb6,0x26,
    0x6f,0xbf,0x0e,0xda,0x46,0x69,0x07,0x57,0x27,0xf2,0x1d,0x9b,0xbc,0x94,0x43,0x03,
    0xf8,0x11,0xc7,0xf6,0x90,0xef,0x3e,0xe7,0x06,0xc3,0xd5,0x2f,0xc8,0x66,0x1e,0xd7,
    0x08,0xe8,0xea,0xde,0x80,0x52,0xee,0xf7,0x84,0xaa,0x72,0xac,0x35,0x4d,0x6a,0x2a,
    0x96,0x1a,0xd2,0x71,0x5a,0x15,0x49,0x74,0x4b,0x9f,0xd0,0x5e,0x04,0x18,0xa4,0xec,
    0xc2,0xe0,0x41,0x6e,0x0f,0x51,0xcb,0xcc,0x24,0x91,0xaf,0x50,0xa1,0xf4,0x70,0x39,
    0x99,0x7c,0x3a,0x85,0x23,0xb8,0xb4,0x7a,0xfc,0x02,0x36,0x5b,0x25,0x55,0x97,0x31,
    0x2d,0x5d,0xfa,0x98,0xe3,0x8a,0x92,0xae,0x05,0xdf,0x29,0x10,0x67,0x6c,0xba,0xc9,
    0xd3,0x00,0xe6,0xcf,0xe1,0x9e,0xa8,0x2c,0x63,0x16,0x01,0x3f,0x58,0xe2,0x89,0xa9,
    0x0d,0x38,0x34,0x1b,0xab,0x33,0xff,0xb0,0xbb,0x48,0x0c,0x5f,0xb9,0xb1,0xcd,0x2e,
    0xc5,0xf3,0xdb,0x47,0xe5,0xa5,0x9c,0x77,0x0a,0xa6,0x20,0x68,0xfe,0x7f,0xc1,0xad
];

function rc2ExpandKey(keyBytes, effectiveKeyBits) {
    effectiveKeyBits = effectiveKeyBits || 1024;
    const T = keyBytes.length;
    const L = new Array(128).fill(0);
    for (let i = 0; i < T; i++) L[i] = keyBytes[i];
    for (let i = T; i < 128; i++) {
        L[i] = RC2_PITABLE[(L[i - 1] + L[i - T]) & 0xFF];
    }
    const T8 = Math.ceil(effectiveKeyBits / 8);
    const TM = 0xFF % Math.pow(2, 8 + effectiveKeyBits - 8 * T8);
    L[128 - T8] = RC2_PITABLE[L[128 - T8] & TM];
    for (let i = 127 - T8; i >= 0; i--) {
        L[i] = RC2_PITABLE[L[i + 1] ^ L[i + T8]];
    }
    const K = new Array(64);
    for (let j = 0; j < 64; j++) {
        K[j] = (L[2 * j] + 256 * L[2 * j + 1]) & 0xFFFF;
    }
    return K;
}

function rc2Rotl16(x, s) {
    x &= 0xFFFF;
    return ((x << s) | (x >>> (16 - s))) & 0xFFFF;
}

function rc2EncryptBlock(K, bytes) {
    const R = [
        bytes[0] | (bytes[1] << 8),
        bytes[2] | (bytes[3] << 8),
        bytes[4] | (bytes[5] << 8),
        bytes[6] | (bytes[7] << 8)
    ];
    const S = [1, 2, 3, 5];
    let j = 0;

    const mixUp = (i) => {
        const i1 = (i + 3) % 4, i2 = (i + 2) % 4, i3 = (i + 1) % 4;
        R[i] = (R[i] + K[j] + (R[i1] & R[i2]) + (~R[i1] & R[i3])) & 0xFFFF;
        j++;
        R[i] = rc2Rotl16(R[i], S[i]);
    };
    const mixRound = () => { mixUp(0); mixUp(1); mixUp(2); mixUp(3); };
    const mashRound = () => {
        R[0] = (R[0] + K[R[3] & 63]) & 0xFFFF;
        R[1] = (R[1] + K[R[0] & 63]) & 0xFFFF;
        R[2] = (R[2] + K[R[1] & 63]) & 0xFFFF;
        R[3] = (R[3] + K[R[2] & 63]) & 0xFFFF;
    };

    for (let r = 0; r < 5; r++) mixRound();
    mashRound();
    for (let r = 0; r < 6; r++) mixRound();
    mashRound();
    for (let r = 0; r < 5; r++) mixRound();

    return [
        R[0] & 0xFF, (R[0] >> 8) & 0xFF,
        R[1] & 0xFF, (R[1] >> 8) & 0xFF,
        R[2] & 0xFF, (R[2] >> 8) & 0xFF,
        R[3] & 0xFF, (R[3] >> 8) & 0xFF
    ];
}

// Key used by the CMU200 firmware to (de)obfuscate SWOPT.DAT entries: "Revision\0"
const CMU200_RC2_KEY = [0x52, 0x65, 0x76, 0x69, 0x73, 0x69, 0x6f, 0x6e, 0x00];
let cmu200ExpandedKey = null;

const CMU200_OPTIONS = [
    { code: 9, name: "K9", desc: "Unknown option" },
    { code: 14, name: "K14", desc: "Unknown option" },
    { code: 16, name: "K16", desc: "Unknown option" },
    { code: 17, name: "K17", desc: "Unknown option" },
    { code: 20, name: "K20", desc: "Unknown option" },
    { code: 21, name: "K21", desc: "GSM/GPRS measurement" },
    { code: 22, name: "K22", desc: "GSM/GPRS measurement" },
    { code: 23, name: "K23", desc: "GSM/GPRS measurement" },
    { code: 24, name: "K24", desc: "GSM/GPRS measurement" },
    { code: 26, name: "K26", desc: "Additional GSM functions" },
    { code: 27, name: "K27", desc: "Additional GSM functions" },
    { code: 28, name: "K28", desc: "Additional GSM functions" },
    { code: 29, name: "K29", desc: "Additional GSM functions" },
    { code: 42, name: "K42", desc: "GPRS/EGPRS" },
    { code: 43, name: "K43", desc: "GPRS/EGPRS" },
    { code: 44, name: "K44", desc: "GPRS/EGPRS" },
    { code: 45, name: "K45", desc: "GPRS/EGPRS" },
    { code: 46, name: "K46", desc: "GPRS/EGPRS" },
    { code: 47, name: "K47", desc: "GPRS/EGPRS" },
    { code: 48, name: "K48", desc: "GPRS/EGPRS" },
    { code: 53, name: "K53", desc: "WCDMA/UMTS" },
    { code: 54, name: "K54", desc: "WCDMA/UMTS" },
    { code: 56, name: "K56", desc: "WCDMA/UMTS" },
    { code: 57, name: "K57", desc: "WCDMA/UMTS" },
    { code: 58, name: "K58", desc: "WCDMA/UMTS" },
    { code: 59, name: "K59", desc: "WCDMA/UMTS" },
    { code: 60, name: "K60", desc: "WCDMA/UMTS" },
    { code: 61, name: "K61", desc: "WCDMA/UMTS" },
    { code: 62, name: "K62", desc: "WCDMA/UMTS" },
    { code: 63, name: "K63", desc: "WCDMA/UMTS" },
    { code: 64, name: "K64", desc: "WCDMA/UMTS" },
    { code: 65, name: "K65", desc: "WCDMA/UMTS" },
    { code: 66, name: "K66", desc: "WCDMA/UMTS" },
    { code: 67, name: "K67", desc: "WCDMA/UMTS" },
    { code: 68, name: "K68", desc: "WCDMA/UMTS" },
    { code: 69, name: "K69", desc: "WCDMA/UMTS" },
    { code: 83, name: "K83", desc: "CDMA2000" },
    { code: 84, name: "K84", desc: "CDMA2000" },
    { code: 85, name: "K85", desc: "CDMA2000" },
    { code: 86, name: "K86", desc: "CDMA2000" },
    { code: 87, name: "K87", desc: "CDMA2000" },
    { code: 88, name: "K88", desc: "CDMA2000" },
    { code: 90, name: "K90", desc: "CDMA2000" },
    { code: 92, name: "K92", desc: "Unknown option" },
    { code: 96, name: "K96", desc: "Unknown option" },
    { code: 839, name: "K839", desc: "Extended option" },
    { code: 849, name: "K849", desc: "Extended option" },
    { code: 859, name: "K859", desc: "Extended option" },
    { code: 869, name: "K869", desc: "Extended option" },
];

function cmu200Key(serial1, serial2, optionCode) {
    if (!cmu200ExpandedKey) cmu200ExpandedKey = rc2ExpandKey(CMU200_RC2_KEY);
    const serial2WithOption = (serial2 + (optionCode << 20)) >>> 0;
    const bytes = [
        serial1 & 0xFF, (serial1 >>> 8) & 0xFF, (serial1 >>> 16) & 0xFF, (serial1 >>> 24) & 0xFF,
        serial2WithOption & 0xFF, (serial2WithOption >>> 8) & 0xFF, (serial2WithOption >>> 16) & 0xFF, (serial2WithOption >>> 24) & 0xFF
    ];
    return rc2EncryptBlock(cmu200ExpandedKey, bytes).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function generateCMU200(serial, resultDiv) {
    const parts = serial.split('/');
    if (parts.length !== 2) {
        resultDiv.innerHTML += '<p style="color:#ff6b6b;">Invalid serial format. Use NNNNNN/XXX</p>';
        return;
    }
    const serial1 = parseInt(parts[0], 10);
    const serial2 = parseInt(parts[1], 10);
    if (!Number.isFinite(serial1) || !Number.isFinite(serial2)) {
        resultDiv.innerHTML += '<p style="color:#ff6b6b;">Invalid serial number</p>';
        return;
    }

    CMU200_OPTIONS.forEach(opt => {
        const key = cmu200Key(serial1, serial2, opt.code);
        resultDiv.innerHTML += `
            <div class="result-item">
                <span class="key">${key}</span>
                <span class="desc">
                    <span class="opt-name">${opt.name}</span>
                    <span class="opt-desc">${opt.desc}</span>
                </span>
            </div>`;
    });
}

function generate() {
    const serial = document.getElementById('serial').value.trim();
    const type = document.getElementById('type').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p style="color:#888;margin-bottom:1rem;">Serial: ' + serial + '</p>';

    if (type === 'cmu200') {
        generateCMU200(serial, resultDiv);
        return;
    }

    const isSmiq = type === 'smiq';
    options.forEach(opt => {
        if (opt.active) {
            const key = encrypt(opt.name, serial, isSmiq);
            const formattedKey = String(key).padStart(6, '0');
            resultDiv.innerHTML += `
                <div class="result-item">
                    <span class="key">${formattedKey}</span>
                    <span class="desc">
                        <span class="opt-name">${opt.name}</span>
                        <span class="opt-desc">${opt.desc}</span>
                    </span>
                </div>`;
        }
    });
}

document.addEventListener('DOMContentLoaded', generate);
