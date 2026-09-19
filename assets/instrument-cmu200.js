// Key used by the CMU200 firmware to (de)obfuscate SWOPT.DAT entries: "Revision\0"
const CMU200_RC2_KEY = [0x52, 0x65, 0x76, 0x69, 0x73, 0x69, 0x6f, 0x6e, 0x00];

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
