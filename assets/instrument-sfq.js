// SFQ option keys, ported from https://github.com/tomverbeure/tomverbeure.github.io (sfq_keygen.py).
const SFQ_ROTATION_TABLE = [1, 5, 0, 3, 1, 9, 6, 2, 1, 5, 0, 3];

const SFQ_OPTIONS = [
    { index: 0, name: "SFQ-B16", desc: "Software option bit 0 (hardware dependent)" },
    { index: 1, name: "SFQ-B8 / SFQ-B12", desc: "Same option bit; installed label depends on hardware" },
    { index: 2, name: "SFQ-B9 / SFQ-B13", desc: "Same option bit; installed label depends on hardware" },
    { index: 3, name: "SFQ-B17", desc: "BER measurement" },
    { index: 4, name: "SFQ-B23 / SFQ-B24", desc: "Hardware dependent" },
    { index: 5, name: "SFQ-B21 / SFQ-B22", desc: "Hardware dependent" },
    { index: 6, name: "SFQ-B25", desc: "Turbo Coding" },
    { index: 7, name: "SFQ-B27", desc: "Impulsive Noise" },
    { index: 8, name: "SFQ-B28", desc: "Software option bit 8" },
];

class SfqGenerator extends InstrumentGenerator {
    constructor() {
        super('sfq', 'SFQ');
    }

    getOptions() {
        return SFQ_OPTIONS;
    }

    validateSerial(serial) {
        if (!/^\d{9}$/.test(serial.replace('/', ''))) {
            return { valid: false, message: 'Invalid serial format. Use 9 digits, e.g. 123456/789' };
        }
        return { valid: true };
    }

    generateKey(serial, option) {
        const digits = serial.replace('/', '');
        const mode = 1;
        const tail = 0;
        const payload = `0${option.index}${mode}${digits}`;
        const rotation = (parseInt(digits[8], 10) + tail) % 12;
        const encoded = SFQ_ROTATION_TABLE.map((bias, i) =>
            (parseInt(payload[(i + rotation) % 12], 10) + bias) % 10
        );
        return encoded.join('') + tail;
    }
}
