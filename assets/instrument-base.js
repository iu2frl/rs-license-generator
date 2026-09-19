// --- Instrument generators ---------------------------------------------------
// Each supported instrument family is a class extending InstrumentGenerator.
// To add a new device: implement getOptions()/generateKey()/formatKey() (and
// validateSerial() if the serial format needs checking), then register an
// instance in INSTRUMENT_GENERATORS and add a matching <option> in index.html.

class InstrumentGenerator {
    constructor(id, label) {
        this.id = id;
        this.label = label;
    }

    // Returns the list of { name, desc, ... } options to generate keys for.
    getOptions() {
        throw new Error(`${this.constructor.name}.getOptions() not implemented`);
    }

    // Computes the raw key (number, byte array, etc.) for a given option.
    generateKey(_serial, _option) {
        throw new Error(`${this.constructor.name}.generateKey() not implemented`);
    }

    // Converts the raw key from generateKey() into its displayed string form.
    formatKey(rawKey) {
        return String(rawKey);
    }

    // Override to reject malformed serials before any keys are generated.
    validateSerial(_serial) {
        return { valid: true };
    }

    render(serial, resultDiv) {
        const validation = this.validateSerial(serial);
        if (!validation.valid) {
            resultDiv.innerHTML += `<p style="color:#ff6b6b;">${validation.message}</p>`;
            return;
        }

        this.getOptions().forEach(opt => {
            const key = this.formatKey(this.generateKey(serial, opt));
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
}
