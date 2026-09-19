// Key used by the CMU200 firmware to (de)obfuscate SWOPT.DAT entries: "Revision\0"
const CMU200_RC2_KEY = [0x52, 0x65, 0x76, 0x69, 0x73, 0x69, 0x6f, 0x6e, 0x00];

const CMU200_OPTIONS = [
    { code: 9, name: "K9", desc: "Unknown option" },
    { code: 14, name: "K14", desc: "Stereo FM transmitter" },
    { code: 16, name: "K16", desc: "WCDMA (3GPP FDD) band 10, UE test signaling software" },
    { code: 17, name: "K17", desc: "WCDMA (3GPP FDD) band 11, UE test signaling software" },
    { code: 20, name: "K20", desc: "GSM400 mobile station signaling/non-signaling test software" },
    { code: 21, name: "K21", desc: "GSM900, R-GSM, and E-GSM mobile station signaling/non-signaling test software" },
    { code: 22, name: "K22", desc: "GSM1800 (DCS) mobile station signaling/non-signaling test software" },
    { code: 23, name: "K23", desc: "GSM1900 (PCS) mobile station signaling/non-signaling test software" },
    { code: 24, name: "K24", desc: "GSM850 mobile station signaling/non-signaling test software" },
    { code: 26, name: "K26", desc: "GT800 mobile station signaling/non-signaling test software" },
    { code: 27, name: "K27", desc: "IS-136/cellular (800 MHz band) mobile station signaling/non-signaling test software" },
    { code: 28, name: "K28", desc: "IS-136/PCS (1900 MHz band) mobile station signaling/non-signaling test software" },
    { code: 29, name: "K29", desc: "AMPS mobile station signaling/non-signaling test software" },
    { code: 42, name: "K42", desc: "GPRS test software extension for all GSM test software packages" },
    { code: 43, name: "K43", desc: "EGPRS classic (EDGE) signaling test software for all GSM test software packages" },
    { code: 44, name: "K44", desc: "Dual transfer mode: simultaneous CS and PS connection for all GSM packages" },
    { code: 45, name: "K45", desc: "AMR test software extension for all GSM test software packages" },
    { code: 46, name: "K46", desc: "Wideband adaptive multirate signaling for GSM and WCDMA (GSM or WCDMA signaling option necessary)" },
    { code: 47, name: "K47", desc: "Smart Alignment for all GSM and CDMA2000 packages" },
    { code: 48, name: "K48", desc: "I/Q versus slot measurement for adjustment of polar modulators" },
    { code: 53, name: "K53", desc: "Bluetooth test software" },
    { code: 54, name: "K54", desc: "WCDMA/UMTS" },
    { code: 56, name: "K56", desc: "HSUPA 5.7 Mbit/s extension, 3GPP/FDD/UE, Rel.6 (CMU-B68, CMU-B21 model 14 or 54, CMU-B56 necessary)" },
    { code: 57, name: "K57", desc: "WCDMA signaling 3GPP/FDD/UE, band 7 (CMU-B68, CMU-B21 model 14 or 54, CMU-B56 necessary)" },
    { code: 58, name: "K58", desc: "WCDMA signaling 3GPP/FDD/UE, band 8 (CMU-B68, CMU-B21 model 14 or 54, CMU-B56 necessary)" },
    { code: 59, name: "K59", desc: "WCDMA signaling 3GPP/FDD/UE, band 9 (CMU-B68, CMU-B21 model 14 or 54, CMU-B56 necessary)" },
    { code: 60, name: "K60", desc: "HSDPA 14 Mbit/s extension 3GPP/FDD/UE, Rel. 5 (CMU-K64 necessary)" },
    { code: 61, name: "K61", desc: "WCDMA (3GPP FDD) band 4, UE test signaling software" },
    { code: 62, name: "K62", desc: "WCDMA (3GPP FDD) band 5, UE test signaling software" },
    { code: 63, name: "K63", desc: "WCDMA (3GPP FDD) band 6, UE test signaling software" },
    { code: 64, name: "K64", desc: "3.6 Mbit/s HSDPA" },
    { code: 65, name: "K65", desc: "WCDMA (3GPP FDD) UL user equipment TX test, non-signaling test software" },
    { code: 66, name: "K66", desc: "WCDMA (3GPP FDD) DL generator, non-signaling test software" },
    { code: 67, name: "K67", desc: "WCDMA (3GPP FDD) band 3, UE test signaling software" },
    { code: 68, name: "K68", desc: "WCDMA (3GPP FDD) band 1, UE test signaling software" },
    { code: 69, name: "K69", desc: "WCDMA (3GPP FDD) band 2, UE test signaling software" },
    { code: 83, name: "K83", desc: "CDMA2000 1xRTT 450 MHz bands (band class 5, 11) test software" },
    { code: 84, name: "K84", desc: "CDMA2000 1xRTT cellular bands (band class 0, 2, 3, 7, 9, 10, 12) test software" },
    { code: 85, name: "K85", desc: "CDMA2000 1xRTT PCS bands (band class 1, 4, 8, 14) test software" },
    { code: 86, name: "K86", desc: "CDMA2000 1xRTT IMT-2000 bands (band class 6, 13, 15, 16, 17) test software" },
    { code: 87, name: "K87", desc: "Extensive CDMA2000 1xRTT/1xEV-DO data testing; requires CMU-B87" },
    { code: 88, name: "K88", desc: "CDMA2000 1x EV-DO Rev. 0 and A non-signaling test software package for CMU-B88, including 450 MHz + cellular + PCS + IMT-2000 bands" },
    { code: 90, name: "K90", desc: "CDMA2000" },
    { code: 92, name: "K92", desc: "(E)GPRS application testing; external PC, Windows XP/2000, GPRS or EGPRS software option, and CMU-B95 auxiliary generator plus power PC required" },
    { code: 96, name: "K96", desc: "WCDMA application testing; at least one WCDMA signaling band necessary" },
    { code: 839, name: "K839", desc: "CDMA2000 1xEV-DO 450 MHz bands (band class 5, 11) test software for CMU-B89" },
    { code: 849, name: "K849", desc: "CDMA2000 1xEV-DO Cellular bands (band class 0, 2, 3, 7, 9, 10, 12) test software for CMU-B89" },
    { code: 859, name: "K859", desc: "CDMA2000 1xEV-DO PCS bands (band class 1, 4, 8, 14) test software for CMU-B89" },
    { code: 869, name: "K869", desc: "CDMA2000 1xEV-DO IMT-2000 bands (band class 6, 13, 15, 16, 17) test software for CMU-B89" },
];

class Cmu200Generator extends InstrumentGenerator {
    constructor() {
        super('cmu200', 'CMU200/CMU300');
        this.expandedKey = null;
    }

    getOptions() {
        return CMU200_OPTIONS;
    }

    validateSerial(serial) {
        const parts = serial.split('/');
        if (parts.length !== 2) {
            return { valid: false, message: 'Invalid serial format. Use NNNNNN/XXX' };
        }
        const [serial1, serial2] = parts.map(p => parseInt(p, 10));
        if (!Number.isFinite(serial1) || !Number.isFinite(serial2)) {
            return { valid: false, message: 'Invalid serial number' };
        }
        return { valid: true };
    }

    generateKey(serial, option) {
        if (!this.expandedKey) this.expandedKey = rc2ExpandKey(CMU200_RC2_KEY);

        const [serial1, serial2] = serial.split('/').map(p => parseInt(p, 10));
        const serial2WithOption = (serial2 + (option.code << 20)) >>> 0;
        const bytes = [
            serial1 & 0xFF, (serial1 >>> 8) & 0xFF, (serial1 >>> 16) & 0xFF, (serial1 >>> 24) & 0xFF,
            serial2WithOption & 0xFF, (serial2WithOption >>> 8) & 0xFF, (serial2WithOption >>> 16) & 0xFF, (serial2WithOption >>> 24) & 0xFF
        ];
        return rc2EncryptBlock(this.expandedKey, bytes);
    }

    formatKey(rawKey) {
        return rawKey.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    }
}
