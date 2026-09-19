#include	<stdio.h>
#include	<stdlib.h>
#include	<inttypes.h>
#include    <stdbool.h>
#include    <string.h>

#define		CRC_POLY_16		0xA001
#define		CRC_START_16	0x0001

static void             init_crc16_tab( void );

static bool             crc_tab16_init          = false;
static uint16_t         crc_tab16[256];

/*
 * uint16_t crc_16( const unsigned char *input_str, size_t num_bytes );
 *
 * The function crc_16() calculates the 16 bits CRC16 in one pass for a byte
 * string of which the beginning has been passed to the function. The number of
 * bytes to check is also a parameter. The number of the bytes in the string is
 * limited by the constant SIZE_MAX.
 */

uint16_t crc_16( const unsigned char *input_str, size_t num_bytes ) {

	uint16_t crc;
	const unsigned char *ptr;
	size_t a;

	if ( ! crc_tab16_init ) init_crc16_tab();

	crc = CRC_START_16;
	ptr = input_str;

	if ( ptr != NULL ) for (a=0; a<num_bytes; a++) {

		crc = (crc >> 8) ^ crc_tab16[ (crc ^ (uint16_t) *ptr++) & 0x00FF ];
	}

	return crc;

}  /* crc_16 */

/*
 * uint16_t update_crc_16( uint16_t crc, unsigned char c );
 *
 * The function update_crc_16() calculates a new CRC-16 value based on the
 * previous value of the CRC and the next byte of data to be checked.
 */

uint16_t update_crc_16( uint16_t crc, unsigned char c ) {

	if ( ! crc_tab16_init ) init_crc16_tab();

	return (crc >> 8) ^ crc_tab16[ (crc ^ (uint16_t) c) & 0x00FF ];

}  /* update_crc_16 */

/*
 * static void init_crc16_tab( void );
 *
 * For optimal performance uses the CRC16 routine a lookup table with values
 * that can be used directly in the XOR arithmetic in the algorithm. This
 * lookup table is calculated by the init_crc16_tab() routine, the first time
 * the CRC function is called.
 */

static void init_crc16_tab( void ) {

	uint16_t i;
	uint16_t j;
	uint16_t crc;
	uint16_t c;

	for (i=0; i<256; i++) {

		crc = 0;
		c   = i;

		for (j=0; j<8; j++) {

			if ( (crc ^ c) & 0x0001 ) crc = ( crc >> 1 ) ^ CRC_POLY_16;
			else                      crc =   crc >> 1;

			c = c >> 1;
		}

		crc_tab16[i] = crc;
        //printf("%X ", crc);
	}
        //printf("\r\n");
        //printf("\r\n");

	crc_tab16_init = true;

}  /* init_crc16_tab */

//
// Options structure
//
typedef struct _option_t 
{
    char *   cOption;       // Option string
    bool     bActive;       // Option active
    char *   cDescr;        // Option description

} option_t;

//
// Allowed options
//
// 1 - Option name    
// 2 - true/false -> enabled/disabled
// 3 - Option description
//
option_t  option_list[] = 
{
	{ "SME32|33|36", false,  "Unknown opt" },
	{ "SME42|43|46", false,  "Enables B41, B42, B43" },
	{ "SME-B31", false,  "Unknown opt" },
	{ "SME-B32", false,  "Unknown opt" },
	{ "SME-B41", false,  "SME-B41 FLEX" },
	{ "SME-B42", false,  "SME-B42 POCSAG" },
	{ "SME-B43", false,  "SME-B43 REFLEX" },
	{ "SMIQ03", true,  "Generator Model" },
	{ "SMIQ03B", true,  "Generator Model" },
	{ "SMIQ03HD", true,  "Generator Model" },
	{ "SMIQ04B", true,  "Generator Model" },
	{ "SMIQ06B", true,  "Generator Model" },
	{ "SMIQB42", true,  "Digital Standard IS-95 CDMA" },
	{ "SMIQB43", true,  "Digital Standard WCDMA to NTT DoCoMo 1.0, ARIB 0.0 standard" },
	{ "SMIQB45", true,  "Digital Standard WCDMA to 3GPP (FDD) " },
	{ "SMIQB47", true,  "Low ACP for IS-95 CDMA and W-CDMA" },
	{ "SMIQB48", true,  "Extended Functions for WCDMA (3GPP)" },
	{ "SMIQB49", true,  "Extended Fading Functions for WCDMA (3GPP)" },
	{ "SMIQB50", true,  "Fast CPU" },
	{ "SMIQB51", true,  "Unknown opt" },
	{ "SMIQB21", true,  "BER measurement" },
	{ "SMIQB60", true,  "Arbitrary Waveform Generator incl. R&S WinIQSIM" },
	{ "SMIQK8", true,  "TETRA T1 Simulator" },
	{ "SMIQK08", true,  "TETRA T1 Simulator" },
	{ "SMIQK11", true,  "Digital Standard IS-95 CDMA" },
	{ "SMIQK12", true,  "Digital Standard cdma2000 " },
	{ "SMIQK13", true,  "Digital Standard WCDMA TDD Mode (3GPP) (" },
	{ "SMIQK14", true,  "Digital Standard TD-SCDMA" },
	{ "SMIQK15", true,  "OFDM Signal Generation, HIPERLAN/2 " },
	{ "SMIQK16", true,  "Digital Standard IEEE 802.11b" },
	{ "SMIQK17", true,  "Digital Standard 1xEV-DO" },
	{ "SMIQK18", true,  "Digital Standard IEEE 802.11a" },
	{ "SMIQK19", true,  "802.11 WIRELESS LAN" },
	{ "SMIQK20", true,  "3GPP FTD INCLUSIVE HSDP" },
	{ 0, 0, 0 }
};

//
// Process Option
//
uint32_t encrypt(char * cpOption, char * cpSer, bool bTypeSMIQ)
{
	char * cpPoint;
	uint32_t u32Len = 0;
    uint32_t u32Key = 0;
    uint16_t u16Crc = 0;
    char cKeyString[100];
    uint32_t u32CharCounter = 0;
    uint32_t u32LoopCounter = 0;

    // Instrument type
    if (bTypeSMIQ)
    {
        cpPoint = strcpy(cKeyString, "SMIQ");
        u32CharCounter = 4;
    }
	else
    {
        cpPoint = strcpy(cKeyString, "SM3");
        u32CharCounter = 3;
    }

    cpPoint = cpSer;

    do
    {
        //printf("Ser str: %c\r\n", *cpPoint);
        if(*cpPoint != 0x20)
        {
            cKeyString[u32CharCounter] = *cpPoint;
            u32CharCounter++;

        }

        if(*cpPoint == 0)
        {
            break;
        }
        cpPoint++;
        u32LoopCounter++;
        
        
    } while (0x10 > u32LoopCounter);
    
    // append option word
    cpPoint = strcat(cKeyString, cpOption);

    // get length of option string
    u32Len = strlen(cKeyString);

    // calculate CRC
    u16Crc = crc_16(cKeyString, u32Len);

    // Scale value
    u32Key = u16Crc * 0x0D;

    //printf("Loop, Len, Char: %u, %u, %u\r\n", u32LoopCounter, u32Len, u32CharCounter);
    //printf("Opt str: %s\r\n", cKeyString);

	// Return with option value
	return u32Key;
}


//
// Instrument values
// UPDATE below variables
//
// Serial for SMIQ: XXXXXX/XXXX (XXXX is important, try adding a zero)
// Serial for SME: XXXXXX/XXX
//
char cSerString []	= {"832492/0081"};		// Instrument serial
bool bGenTypeSMIQ = true;                    // Instrument type (SME = false, SMIQ = true)


//
// Generate Option Keys for R&S SMx/SMIQx Generators
//
// Compile with: gcc -o SMx SMx.c
// Run with: ./SMx
//
int main(void)
{
	uint32_t u32key;
	option_t * pOptionLst = option_list;	

	//
	// Calculate all enabled options for Serial
	//
    
	printf("Serial: %s\r\n", cSerString);

	// For all available options
	while (pOptionLst->cOption)
	{
		// Check if option valid
		if(pOptionLst->bActive)
		{
			// Key calculation
            u32key = encrypt(pOptionLst->cOption, cSerString, bGenTypeSMIQ);
            printf("%06u - %s\r\n", u32key, pOptionLst->cOption);
		}

		// Next option
		pOptionLst++;
	}

}
