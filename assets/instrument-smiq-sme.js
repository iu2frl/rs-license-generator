const SMIQ_SME_OPTIONS = [
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

class SmiqSmeGenerator extends InstrumentGenerator {
    constructor(id, label, prefix) {
        super(id, label);
        this.prefix = prefix;
    }

    getOptions() {
        return SMIQ_SME_OPTIONS.filter(opt => opt.active);
    }

    generateKey(serial, option) {
        let keyString = this.prefix;
        let loopCounter = 0;
        let ptr = 0;

        while (loopCounter < 0x10 && ptr < serial.length) {
            const ch = serial[ptr];
            if (ch !== ' ') keyString += ch;
            ptr++;
            loopCounter++;
        }

        keyString += option.name;
        return crc16(keyString) * 0x0D;
    }

    formatKey(rawKey) {
        return String(rawKey).padStart(6, '0');
    }
}
