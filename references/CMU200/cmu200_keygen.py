#!/usr/bin/env python3
"""
CMU200 License Generator

Generates ARC2-encrypted license keys for RS CMU200
cellular test equipment.

Usage:
    python cmu200_keygen.py [serial] [option_code]
    python cmu200_keygen.py 837109/035 29

Format:
    - SWOPT.DAT contains one 16-char hex key per line
    - Encryption: ARC2 (RC2) ECB mode, key = "Revision\\0"
    - Record: struct.pack("<II", serial1, serial2 + (option << 20))
"""

import struct
import sys

try:
    from Crypto.Cipher import ARC2
except ImportError:
    print("Error: pycryptodome not installed. Install with: pip install pycryptodome")
    sys.exit(1)

KEY = b"Revision\x00"

KNOWN_OPTIONS = [
    {"code": 9, "name": "K9"},
    {"code": 14, "name": "K14"},
    {"code": 16, "name": "K16"},
    {"code": 17, "name": "K17"},
    {"code": 20, "name": "K20"},
    {"code": 21, "name": "K21"},
    {"code": 22, "name": "K22"},
    {"code": 23, "name": "K23"},
    {"code": 24, "name": "K24"},
    {"code": 26, "name": "K26"},
    {"code": 27, "name": "K27"},
    {"code": 28, "name": "K28"},
    {"code": 29, "name": "K29"},
    {"code": 42, "name": "K42"},
    {"code": 43, "name": "K43"},
    {"code": 44, "name": "K44"},
    {"code": 45, "name": "K45"},
    {"code": 46, "name": "K46"},
    {"code": 47, "name": "K47"},
    {"code": 48, "name": "K48"},
    {"code": 53, "name": "K53"},
    {"code": 54, "name": "K54"},
    {"code": 56, "name": "K56"},
    {"code": 57, "name": "K57"},
    {"code": 58, "name": "K58"},
    {"code": 59, "name": "K59"},
    {"code": 60, "name": "K60"},
    {"code": 61, "name": "K61"},
    {"code": 62, "name": "K62"},
    {"code": 63, "name": "K63"},
    {"code": 64, "name": "K64"},
    {"code": 65, "name": "K65"},
    {"code": 66, "name": "K66"},
    {"code": 67, "name": "K67"},
    {"code": 68, "name": "K68"},
    {"code": 69, "name": "K69"},
    {"code": 83, "name": "K83"},
    {"code": 84, "name": "K84"},
    {"code": 85, "name": "K85"},
    {"code": 86, "name": "K86"},
    {"code": 87, "name": "K87"},
    {"code": 88, "name": "K88"},
    {"code": 90, "name": "K90"},
    {"code": 92, "name": "K92"},
    {"code": 96, "name": "K96"},
    {"code": 839, "name": "K839"},
    {"code": 849, "name": "K849"},
    {"code": 859, "name": "K859"},
    {"code": 869, "name": "K869"},
]


def generate_key(serial_full: str, option_code: int) -> str:
    """
    Generate a CMU200 license key.

    Args:
        serial_full: Serial number in format "NNNNNN/XXX"
        option_code: Option number (e.g., 29 for K29)

    Returns:
        16-character uppercase hex key
    """
    parts = serial_full.split('/')
    if len(parts) != 2:
        raise ValueError("Invalid serial format. Use NNNNNN/XXX")

    serial1 = int(parts[0])
    serial2 = int(parts[1])  # Leading zeros dropped automatically
    serial2_with_option = serial2 + (option_code << 20)

    # Pack record: struct.pack("<II", serial1, serial2 + (option << 20))
    record = struct.pack("<II", serial1, serial2_with_option)

    # Encrypt with ARC2 ECB
    cipher = ARC2.new(KEY, ARC2.MODE_ECB)
    encrypted = cipher.encrypt(record)

    return encrypted.hex().upper()


def decode_key(hex_key: str) -> dict:
    """
    Decode a CMU200 license key.

    Args:
        hex_key: 16-character hex key

    Returns:
        Dictionary with serial1, serial2, option_code
    """
    bytes_key = bytes.fromhex(hex_key)
    cipher = ARC2.new(KEY, ARC2.MODE_ECB)
    decrypted = cipher.decrypt(bytes_key)

    serial1, serial2_with_option = struct.unpack("<II", decrypted)
    option_code = (serial2_with_option >> 20) & 0xFF
    serial2 = serial2_with_option & 0xFFFFF

    return {
        "serial1": serial1,
        "serial2": serial2,
        "option_code": option_code
    }


def main():
    if len(sys.argv) < 2:
        print("Usage: python cmu200_keygen.py [serial] [option]")
        print("")
        print("Examples:")
        print("  python cmu200_keygen.py              # Generate all keys")
        print("  python cmu200_keygen.py 837109/035   # Generate all keys for serial")
        print("  python cmu200_keygen.py 837109/035 29 # Generate K29 key only")
        print("")
        print("Format: NNNNNN/XXX (e.g., 837109/035)")
        print("Keys are stored in C:\\CMU\\DATA\\SWOPT.DAT")
        sys.exit(0)

    serial = sys.argv[1]

    if len(sys.argv) >= 3:
        # Single key mode
        option_code = int(sys.argv[2])
        key = generate_key(serial, option_code)
        print(key)
    else:
        # All options mode
        print(f"CMU200 License Keys for Serial: {serial}")
        print("=" * 50)
        for opt in KNOWN_OPTIONS:
            key = generate_key(serial, opt["code"])
            print(f"{opt['name']}: {key}")


if __name__ == "__main__":
    main()
