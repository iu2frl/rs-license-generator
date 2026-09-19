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
    { name: "SME-B31", active: false, desc: "Unknown opt" },
    { name: "SME-B32", active: false, desc: "Unknown opt" },
    { name: "SME-B41", active: false, desc: "SME-B41 FLEX" },
    { name: "SME-B42", active: false, desc: "SME-B42 POCSAG" },
    { name: "SME-B43", active: false, desc: "SME-B43 REFLEX" },
    { name: "SMIQ03", active: true, desc: "Generator Model" },
    { name: "SMIQ03B", active: true, desc: "Generator Model" },
    { name: "SMIQ03HD", active: true, desc: "Generator Model" },
    { name: "SMIQ04B", active: true, desc: "Generator Model" },
    { name: "SMIQ06B", active: true, desc: "Generator Model" },
    { name: "SMIQB42", active: true, desc: "Digital Standard IS-95 CDMA" },
    { name: "SMIQB43", active: true, desc: "Digital Standard WCDMA NTT DoCoMo 1.0 / ARIB 0.0" },
    { name: "SMIQB45", active: true, desc: "Digital Standard WCDMA 3GPP (FDD)" },
    { name: "SMIQB47", active: true, desc: "Low ACP for IS-95 CDMA and W-CDMA" },
    { name: "SMIQB48", active: true, desc: "Extended Functions for WCDMA (3GPP)" },
    { name: "SMIQB49", active: true, desc: "Extended Fading Functions for WCDMA (3GPP)" },
    { name: "SMIQB50", active: true, desc: "Fast CPU" },
    { name: "SMIQB51", active: true, desc: "Unknown opt" },
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

function copyKey(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => btn.textContent = orig, 1200);
    });
}

function generate() {
    const serial = document.getElementById('serial').value.trim();
    const isSmiq = document.getElementById('type').value === 'smiq';
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p style="color:#888;margin-bottom:1rem;">Serial: ' + serial + '</p>';

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
                    <button class="copy-btn" onclick="copyKey('${formattedKey}', this)">Copy</button>
                </div>`;
        }
    });
}

document.addEventListener('DOMContentLoaded', generate);
