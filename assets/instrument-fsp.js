// FSP option table, cross-checked against both references/FSP series/main.c and
// https://github.com/rdelien/fsxx_keygen (fsp_options[]) - seed indices agree exactly.
const FSP_OPTIONS = [
    { seedIndex: 0, name: "K5", desc: "GSM/EDGE Application Firmware" },
    { seedIndex: 1, name: "K7", desc: "AM/FM/PM Measurement Demodulator" },
    { seedIndex: 2, name: "B17", desc: "IQ Online" },
    { seedIndex: 4, name: "K84", desc: "1xEV-DO BTS Application Firmware" },
    { seedIndex: 5, name: "K84", desc: "1xEV-DO MS Application Firmware" },
    { seedIndex: 10, name: "K9", desc: "Power Meter" },
    { seedIndex: 14, name: "K76", desc: "3GPP TD-SCDMA BTS Application Firmware" },
    { seedIndex: 15, name: "K77", desc: "3GPP TD-SCDMA MS Application Firmware" },
    { seedIndex: 16, name: "K30", desc: "Noise Figure Measurement" },
    { seedIndex: 17, name: "K82", desc: "CDMA2000 BTS Application Firmware" },
    { seedIndex: 18, name: "K83", desc: "CDMA2000 MS Application Firmware" },
    { seedIndex: 19, name: "K8", desc: "Bluetooth Application Firmware" },
    { seedIndex: 20, name: "K40", desc: "Phase Noise Measurement" },
];

class FspGenerator extends FsxxGenerator {
    constructor() {
        super('fsp', 'FSP series', FSP_OPTIONS);
    }
}
