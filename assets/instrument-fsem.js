// FSEM option table (FSEM20/21/30/31), extracted from the option catalog embedded in
// the "R&S Keygen" WASM app at https://rohde.nonexistent.ca/ (model key "FSEMx").
// Shares most seed indices with FSIQ3 but is not identical (index 14 differs, and
// FSEM has an extra option at index 16), so it is kept as its own instrument.
const FSEM_OPTIONS = [
    { seedIndex: 0, name: "K10", desc: "GSM MS Analyzer" },
    { seedIndex: 1, name: "K11", desc: "GSM BTS Analyzer" },
    { seedIndex: 2, name: "B5", desc: "FFT" },
    { seedIndex: 3, name: "ESI", desc: "" },
    { seedIndex: 4, name: "Kxx", desc: "Receiver Mode" },
    { seedIndex: 5, name: "FSQ", desc: "FSIQ Application" },
    { seedIndex: 6, name: "K71", desc: "CDMA ONE BTS Analyzer" },
    { seedIndex: 7, name: "K72", desc: "W-CDMA BTS Analyzer" },
    { seedIndex: 8, name: "K12", desc: "Digital Standard ICO" },
    { seedIndex: 9, name: "K20", desc: "EDGE MS Analyzer Extension" },
    { seedIndex: 10, name: "K21", desc: "EDGE BTS Analyzer Extension" },
    { seedIndex: 11, name: "K73", desc: "W-CDMA MS Analyzer" },
    { seedIndex: 12, name: "K30", desc: "850 MHz Extension for K10/K20" },
    { seedIndex: 13, name: "K31", desc: "850 MHz Extension for K11/K21" },
    { seedIndex: 14, name: "B31", desc: "Freq limit 31 GHz" },
    { seedIndex: 15, name: "B40", desc: "Freq limit 41 GHz" },
    { seedIndex: 16, name: "K74", desc: "W-CDMA HSDPA BTS" },
];

class FsemGenerator extends FsxxGenerator {
    constructor() {
        super('fsem', 'FSEM series', FSEM_OPTIONS);
    }
}
