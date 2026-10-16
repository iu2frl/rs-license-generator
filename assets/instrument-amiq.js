// AMIQ option keys, ported from https://github.com/tomverbeure/tomverbeure.github.io (amiq/key_gen.py).
// Entries with an empty label upstream (K18, K20 and padding) are omitted.
const AMIQ_OPTIONS = [
    { index: 0, name: "AMIQ-B1", desc: "BER measurement" },
    { index: 1, name: "AMIQ-B19", desc: "Rear I/Q outputs" },
    { index: 2, name: "AMIQ-B2", desc: "Differential I/Q outputs" },
    { index: 3, name: "AMIQ-K11", desc: "IS-95 CDMA" },
    { index: 4, name: "AMIQ-B3", desc: "Digital I/Q output" },
    { index: 5, name: "AMIQ-K12", desc: "Digital Standard CDMA2000" },
    { index: 6, name: "AMIQ-K13", desc: "Digital Standard WCDMA TDD mode (3GPP)" },
    { index: 7, name: "AMIQ-K14", desc: "Digital Standard TD-SCDMA" },
    { index: 8, name: "AMIQ-K15", desc: "OFDM Signal Generation HIPERLAN/2" },
    { index: 9, name: "AMIQ-K16", desc: "Digital Standard 802.11b" },
    { index: 10, name: "AMIQ-K17", desc: "Digital Standard 1xEV-DO" },
    { index: 12, name: "AMIQ-K19", desc: "Digital Standard 802.11" },
];

function md5Bytes(bytes) {
    const K = new Uint32Array(64);
    for (let i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) >>> 0;
    const S = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
    const len = bytes.length;
    const padded = new Uint8Array(((len + 8) >> 6 << 6) + 64);
    padded.set(bytes);
    padded[len] = 0x80;
    const view = new DataView(padded.buffer);
    view.setUint32(padded.length - 8, (len << 3) >>> 0, true);
    view.setUint32(padded.length - 4, Math.floor(len / 0x20000000), true);

    let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;
    for (let off = 0; off < padded.length; off += 64) {
        let a = a0, b = b0, c = c0, d = d0;
        for (let i = 0; i < 64; i++) {
            let f, g;
            if (i < 16) { f = (b & c) | (~b & d); g = i; }
            else if (i < 32) { f = (d & b) | (~d & c); g = (5 * i + 1) & 15; }
            else if (i < 48) { f = b ^ c ^ d; g = (3 * i + 5) & 15; }
            else { f = c ^ (b | ~d); g = (7 * i) & 15; }
            f = (f + a + K[i] + view.getUint32(off + g * 4, true)) >>> 0;
            a = d; d = c; c = b;
            const s = S[(i >> 4) * 4 + (i & 3)];
            b = (b + ((f << s) | (f >>> (32 - s)))) >>> 0;
        }
        a0 = (a0 + a) >>> 0; b0 = (b0 + b) >>> 0; c0 = (c0 + c) >>> 0; d0 = (d0 + d) >>> 0;
    }
    const out = new Uint8Array(16);
    const ov = new DataView(out.buffer);
    [a0, b0, c0, d0].forEach((v, i) => ov.setUint32(i * 4, v, true));
    return out;
}

class AmiqGenerator extends InstrumentGenerator {
    constructor() {
        super('amiq', 'AMIQ');
    }

    getOptions() {
        return AMIQ_OPTIONS;
    }

    validateSerial(serial) {
        if (!/^\d{6}\/\d{3}$/.test(serial)) {
            return { valid: false, message: 'Invalid serial format. Use NNNNNN/NNN' };
        }
        return { valid: true };
    }

    generateKey(serial, option) {
        const hash = md5Bytes(new TextEncoder().encode(`${serial}${option.index}`));
        let key = 0n;
        for (let i = 0; i < 8; i++) {
            key = key * 10n + BigInt(hash[i * 2] + hash[i * 2 + 1]);
        }
        key &= 0xFFFFFFFFn;
        if (key > 0x7FFFFFFFn) key = 0x100000000n - key;
        return key;
    }
}
