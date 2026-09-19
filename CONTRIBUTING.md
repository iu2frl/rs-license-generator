# Contributing

Thanks for considering contributing to this project! The most valuable contributions are new supported instrument models, so this guide focuses on that.

## Reporting a new/missing model

If you own an R&S instrument that isn't supported yet, or is supported but missing options, please open a [GitHub issue](https://github.com/iu2frl/rs-sm-license-generator/issues/new) and include as much of the following as you can:

- Instrument model and variant (e.g. `SMIQ03B`, `CMU200`).
- Firmware/software version.
- Full serial number format (redact the actual number if you prefer, but show the pattern, e.g. `NNNNNN/XXX`).
- The option name(s)/code(s) you want to unlock, and what they do.
- Any known license file location (e.g. `SWOPT.DAT`) or existing keygen tools/scripts for that instrument, even partial or written for another language.
- Ideally, a set of **known-valid serial/option/key triplets** from a real instrument, or a firmware/EXE dump that can be reverse engineered. Without at least one verified example, a new algorithm cannot be validated.

## Contributing the reverse engineering work yourself

If you've already reverse engineered (or found documented) the algorithm for a new instrument:

1. Add your research notes, original scripts, or decompiled sources under `references/<model>/`, similar to the existing [references/CMU200](./references/CMU200) and [references/SM series](./references/SM%20series) folders. Include where the algorithm/data came from (forum thread, firmware version, tool used).
2. Validate the algorithm against real key/serial pairs from a physical instrument (or independently verified data) before porting it — a plausible-looking algorithm that produces wrong keys is worse than no algorithm at all.
3. Port the validated algorithm to the web app (see "Adding a new instrument to the app" below).
4. Open a pull request referencing the issue/discussion and describing how the algorithm was validated.

## Adding a new instrument to the app

The generator is split into small, per-purpose scripts under [assets/](./assets):

- `utils-*.js` — shared crypto/algorithm primitives (e.g. CRC16, RC2/ARC2). Add a new one here only if your instrument needs a different primitive.
- `instrument-base.js` — the `InstrumentGenerator` base class every instrument extends.
- `instrument-<model>.js` — one file per instrument family, containing its options table and a class extending `InstrumentGenerator`.
- `app.js` — the `INSTRUMENT_GENERATORS` registry and UI entry point.

To add a new instrument:

1. Create `assets/instrument-<model>.js` with a class extending `InstrumentGenerator`, implementing:
   - `getOptions()` — the list of `{ name, desc, ... }` options to generate keys for.
   - `generateKey(serial, option)` — computes the raw key for one option.
   - `formatKey(rawKey)` — formats the raw key for display (optional, defaults to `String(rawKey)`).
   - `validateSerial(serial)` — rejects malformed serials before generating keys (optional).
2. Register an instance of the new class in `INSTRUMENT_GENERATORS` in [assets/app.js](./assets/app.js).
3. Add a `<script src="assets/instrument-<model>.js"></script>` tag in [index.html](./index.html), after `instrument-base.js` (and after any `utils-*.js` it depends on).
4. Add a matching `<option>` to the instrument `<select>` in [index.html](./index.html).
5. Verify the generated keys against known-valid examples before opening a pull request.

## Code style

- No build step or bundler — the app is plain HTML/CSS/JS served statically, so it can be hosted directly on GitHub Pages.
- Keep new instruments self-contained in their own `assets/instrument-*.js` file rather than growing existing files.
