// FSQ8 option table, ported from https://github.com/rdelien/fsxx_keygen (fsq8_options[]).
// Entries flagged invalid, unlabeled ("None"), or explicitly noted as likely broken upstream
// ("Probably Invalid: Throws Exception") are intentionally omitted.
const FSQ8_OPTIONS = [
    { seedIndex: 0, name: "K5", desc: "GSM/EDGE Application Firmware" },
    { seedIndex: 1, name: "K7", desc: "AM/FM/PM Measurement Demodulator" },
    { seedIndex: 4, name: "K84", desc: "1xEV-DO BTS Application Firmware" },
    { seedIndex: 5, name: "K85", desc: "1xEV-DO MS Application Firmware" },
    { seedIndex: 6, name: "K90", desc: "FSQ WLAN 802.11a" },
    { seedIndex: 7, name: "K72", desc: "WCDMA BTS Analyser" },
    { seedIndex: 8, name: "K74", desc: "WCDMA BTS Analyser" },
    { seedIndex: 10, name: "K9", desc: "Power Meter" },
    { seedIndex: 11, name: "K73", desc: "WCDMA MS Analyser" },
    { seedIndex: 13, name: "K90UP", desc: "FSQ WLAN 802.11a,b,g" },
    { seedIndex: 14, name: "K76", desc: "3GPP TD-SCDMA BTS Analyser" },
    { seedIndex: 15, name: "K77", desc: "3GPP TD-SCDMA MS Analyser" },
    { seedIndex: 16, name: "K30", desc: "Noise Figure Measurement" },
    { seedIndex: 17, name: "K82", desc: "CDMA2000 BTS Analyser" },
    { seedIndex: 18, name: "K83", desc: "CDMA2000 MS Analyser" },
    { seedIndex: 19, name: "K8", desc: "Bluetooth" },
    { seedIndex: 20, name: "K40", desc: "Phase Noise Measurement" },
    { seedIndex: 21, name: "K70", desc: "Vector Signal Analysis" },
    { seedIndex: 25, name: "Trial", desc: "31 days trial period" },
    { seedIndex: 26, name: "Trial", desc: "141 days trial period" },
    { seedIndex: 27, name: "K91", desc: "FSQ WLAN 802.11a,b,g" },
    { seedIndex: 29, name: "B8", desc: "Frequency Extension" },
    { seedIndex: 30, name: "K92", desc: "FSQ 802.16" },
    { seedIndex: 31, name: "Transducer Set", desc: "" },
    { seedIndex: 33, name: "K901", desc: "277 days trial period" },
    { seedIndex: 34, name: "K902", desc: "414 days trial period" },
    { seedIndex: 35, name: "K92UP", desc: "FSQ 802.16e" },
    { seedIndex: 36, name: "K93", desc: "FSQ 802.16e" },
    { seedIndex: 39, name: "K100", desc: "LTE FDD Downlink" },
    { seedIndex: 40, name: "K101", desc: "LTE FDD Uplink" },
    { seedIndex: 42, name: "K15", desc: "VOR/ILS Avionics Demodulator" },
    { seedIndex: 44, name: "K94", desc: "FSQ 802.16e MIMO" },
    { seedIndex: 45, name: "K102", desc: "LTE Downlink MIMO" },
    { seedIndex: 46, name: "K103", desc: "LTE Uplink MIMO" },
    { seedIndex: 47, name: "K96", desc: "OFDM-VSA" },
    { seedIndex: 48, name: "K74UP", desc: "WCDMA BTS Analyser" },
    { seedIndex: 50, name: "K400", desc: "RFEX-F Launcher" },
    { seedIndex: 52, name: "K110", desc: "TETRA 2" },
    { seedIndex: 53, name: "K10", desc: "GSM/EDGE (FW extension packet required)" },
    { seedIndex: 55, name: "K104", desc: "LTE TDD Downlink" },
    { seedIndex: 56, name: "K105", desc: "LTE TDD Uplink" },
    { seedIndex: 57, name: "K106", desc: "LTE TDD/FDD Upgrade" },
    { seedIndex: 58, name: "K5UP", desc: "GSM/EDGE Application Firmware upgrade" },
    { seedIndex: 59, name: "K150", desc: "Support for User Calibration" },
];

class Fsq8Generator extends FsxxGenerator {
    constructor() {
        super('fsq8', 'FSQ8', FSQ8_OPTIONS);
    }
}
