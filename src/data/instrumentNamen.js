export const instrumentNamen = {
  // Einzelaktien
  US0378331005: 'Apple',
  US5949181045: 'Microsoft',
  US67066G1040: 'Nvidia',
  US0231351067: 'Amazon',
  US02079K3059: 'Alphabet',
  US30303M1027: 'Meta',
  US88160R1014: 'Tesla',
  US0079031078: 'AMD',
  US11135F1012: 'Broadcom',
  US8740391003: 'TSMC',
  NL0010273215: 'ASML',
  US46625H1005: 'JPMorgan Chase',
  US92826C8394: 'Visa',
  US57636Q1040: 'Mastercard',
  US22160K1051: 'Costco',
  US9311421039: 'Walmart',
  US0846707026: 'Berkshire Hathaway',
  US1491231015: 'Caterpillar',
  US5324571083: 'Eli Lilly',
  DK0062498333: 'Novo Nordisk',
  DE0007164600: 'SAP',
  DE0007236101: 'Siemens',
  DE0008404005: 'Allianz',
  DE000BASF111: 'BASF',
  DE0005557508: 'Deutsche Telekom',
  DE0007100000: 'Mercedes-Benz',
  DE0005190003: 'BMW',
  DE0006231004: 'Infineon',
  DE000A1EWWW0: 'adidas',
  LU1598757687: 'ArcelorMittal',
  GB0009895292: 'AstraZeneca',
  GB0007980591: 'BP',
  AT0000606306: 'Raiffeisen Bank International',
  // ETFs
  IE00B5BMR087: 'iShares Core S&P 500',
  IE00B4L5Y983: 'iShares Core MSCI World',
  IE00BK5BQT80: 'Vanguard FTSE All-World',
  IE00BJ5JPG56: 'iShares MSCI China',
  IE00B3WJKG14: 'iShares S&P 500 Info Tech',
  IE00B4JNQZ49: 'iShares S&P 500 Financials',
  IE00B53SZB19: 'Invesco EQQQ Nasdaq-100',
  IE00BYXG2H39: 'iShares Nasdaq US Biotechnology',   // korrigiert
  IE00BJZ2DD79: 'Xtrackers Russell 2000',
  LU0380865021: 'Xtrackers Euro Stoxx 50',
  IE00BKM4GZ66: 'iShares Core MSCI EM IMI',
  IE00B02KXH56: 'iShares MSCI Japan',
  IE00BZCQB185: 'iShares MSCI India',
  IE00BYZK4776: 'iShares Healthcare Innovation',      // korrigiert
  IE00B4ND3602: 'iShares Physical Gold',
  IE00B4NCWG09: 'iShares Physical Silver',
  IE00B1FZS467: 'iShares Global Infrastructure',      // korrigiert
  IE00B14X4T88: 'iShares Asia Pacific Dividend',       // korrigiert
  IE00B66F4759: 'iShares EUR High Yield Corp Bond',
  IE00B4L60045: 'iShares EUR Corporate Bond 1-5yr',
}

export function holeName(isin) {
  return instrumentNamen[isin] || isin
}
