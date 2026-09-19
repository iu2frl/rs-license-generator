// Shared behavior for the FSxx spectrum analyzer family (FSP, FSIQ3, FSQ8, ...):
// every model uses the same cipher and seed pool, only the option-index table differs.
class FsxxGenerator extends InstrumentGenerator {
    constructor(id, label, options) {
        super(id, label);
        this.options = options;
    }

    getOptions() {
        return this.options;
    }

    validateSerial(serial) {
        const parts = serial.split('/');
        if (parts.some(p => !Number.isFinite(parseInt(p, 10)))) {
            return { valid: false, message: 'Invalid serial format. Use NNNNNN/XXX' };
        }
        return { valid: true };
    }

    generateKey(serial, option) {
        const seriale = fsxxSerialToInt(serial);
        return fsxxEncrypt(FSXX_SEEDS[option.seedIndex], seriale);
    }

    formatKey(rawKey) {
        return String(rawKey >>> 0).padStart(10, '0');
    }
}
