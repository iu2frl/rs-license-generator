# R&S SMx License Generator

This project is a web-based tool for generating license keys for R&S SMx and SMIQx instruments. It allows users to input the serial number and select the instrument type to generate the corresponding license keys.

## Usage

- Navigate to `index.html` in your web browser.
- Enter the serial number of your instrument.
- Select the instrument type (SMx or SMIQx) from the dropdown menu.
- Click the "Generate Keys" button to generate the license keys.
- The generated keys will be displayed below the button.

## Disclaimer

> [!WARNING]
> This tool is intended for educational and testing purposes only. The author is not responsible for any misuse or illegal activities involving the generated license keys. Use this tool at your own risk.

> [!NOTE]
> Some options require specific instrument models, configurations, firmware release, or hardware modules to be active. Ensure that your instrument supports the selected options before generating license keys.

## Report a missing feature

If you encounter a missing feature or option that should be available for your instrument, please report it by opening an issue on the GitHub repository. Include details about your instrument model, firmware version, and the feature you believe is missing.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Credits

This code was ported and adapted from the original R&S SMx license generation scripts found at [EEVBlog](https://www.eevblog.com/forum/testgear/enabling-options-for-rs-test-equipment/325/) for educational purposes.

Original source code at: [SMx.c](./SMx.c) by [leakyDiode](https://www.eevblog.com/forum/profile/?u=1010671)
