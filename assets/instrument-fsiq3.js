// FSIQ3 option table, ported from https://github.com/rdelien/fsxx_keygen (fsiq3_options[]).
// Some entries never show a confirmation dialog on FSIQ3 but are still valid seeds to enter.
const FSIQ3_OPTIONS = [
    { seedIndex: 0, name: "K10", desc: "GSM MS Analyzer" },
    { seedIndex: 1, name: "K11", desc: "GSM BTS Analyzer" },
    { seedIndex: 2, name: "B5", desc: "FFT" },
    { seedIndex: 3, name: "ESI", desc: "Does not show on FSIQ3" },
    { seedIndex: 4, name: "Kxx", desc: "Receiver Mode" },
    { seedIndex: 5, name: "FSIQ", desc: "" },
    { seedIndex: 6, name: "K71", desc: "CDMA ONE BTS Analyzer" },
    { seedIndex: 7, name: "K72", desc: "W-CDMA BTS Analyzer" },
    { seedIndex: 8, name: "K12", desc: "Digital Standard ICO" },
    { seedIndex: 9, name: "K20", desc: "EDGE MS Analyzer Extension" },
    { seedIndex: 10, name: "K21", desc: "EDGE BTS Analyzer Extension" },
    { seedIndex: 11, name: "K73", desc: "W-CDMA MS Analyzer" },
    { seedIndex: 12, name: "K30", desc: "850 MHz Extension for K10/K20" },
    { seedIndex: 13, name: "K31", desc: "850 MHz Extension for K11/K21" },
    { seedIndex: 14, name: "AFB", desc: "Does not show on FSIQ3" },
    { seedIndex: 15, name: "Freq limit 41GHz", desc: "Does not show on FSIQ3" },
];

class Fsiq3Generator extends FsxxGenerator {
    constructor() {
        super('fsiq3', 'FSIQ3', FSIQ3_OPTIONS);
    }
}
