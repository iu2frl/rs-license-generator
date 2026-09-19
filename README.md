# R&S License Generator

This project is a web-based tool for generating license keys for old R&S instruments.

It allows hobbyists to enable features on now abandoned R&S instruments.

Supported Instruments:

- SMx series
- SMIQx series (tested successfully)
- CMU200/300
- FSP series
- FSIQ3
- FSQ8
- FSEM series

This work was made possible thanks to the contributions and reverse engineering efforts shared by online forums, particularly the EEVBlog community.

## Disclaimer

> [!WARNING]
> This tool is intended for educational and testing purposes only. The author is not responsible for any misuse or illegal activities involving the generated license keys. Use this tool at your own risk.

### Important Note

> [!NOTE]
> Some options require specific instrument models, configurations, firmware release, or hardware modules to be active. Ensure that your instrument supports the selected options before generating license keys.

> [!IMPORTANT]
> Always make a full backup of your instrument's configuration and license keys before using this tool.

### Why this repo?

Some time ago I had to contact R&S to recover a license on a refurbished instrument, but after some chatting with the support, their response was *sorry, we don't have that software anymore, you're out of luck*. This experience motivated the creation of this project to help hobbyists and enthusiasts enable features on older R&S instruments.

It is not my intention to encourage illegal activities or the unauthorized use of software. This project is purely to allow hobbyists and enthusiasts to explore and enable features on older R&S instruments for educational and testing purposes that would otherwise be inaccessible.

## Usage

- Navigate to [the `index.html` page](https://iu2frl.github.io/rs-license-generator/) in your web browser.
- Enter the serial number of your instrument.
- Select the instrument type from the dropdown menu.
- Click the "Generate Keys" button to generate the license keys.
- The generated keys will be displayed below the button.

## Report a missing feature

If you encounter a missing feature or option that should be available for your instrument, please report it by opening an issue on the GitHub repository. Include details about your instrument model, firmware version, and the feature you believe is missing.

If you are not afraid of coding, you can also open a pull request with your proposed changes or additions to the project, you can find guidance in the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Credits

This code was ported and adapted from the original R&S SMx license generation scripts found at [EEVBlog](https://www.eevblog.com/forum/testgear/enabling-options-for-rs-test-equipment/325/) for educational purposes.

- Original source code for the SMx series at: [SMx.c](./references/SM%20series/SMx.c) by [leakyDiode](https://www.eevblog.com/forum/profile/?u=1010671)
- Original source code for the FSP series at: [FSP.c](./references/FSP%20series/FSP%20Keygen.sln) by [eliocor](https://www.eevblog.com/forum/profile/?u=3095)
- Generator for the CMU series was reverse engineered by decompiling the `baseV5.22` firmware. See the [CMU200](./references/CMU200/) folder for details.
- FSIQ3, FSQ8 and FSEM option catalogs were cross-checked against [rdelien/fsxx_keygen](https://github.com/rdelien/fsxx_keygen) and the [R&S Keygen](https://rohde.nonexistent.ca/) WASM app, in addition to the original FSP source above.
