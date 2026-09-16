import type { CompanySettings } from '../types/quotation';

// This is your "Company Settings" screen, persisted, editable by admin.
// Seed it with what's on the uploaded template so nothing is hardcoded
// inside the header/footer/watermark components below.
export const defaultCompanySettings: CompanySettings = {
  name: 'Daksh Elevators Pvt. Ltd.',
  tagline: 'INSTALLATION | SERVICE | MODERNIZATION',
  logoUrl: '/quotation-logo.png',         // reused for header AND watermark — react-pdf needs jpg/png, not webp
  addressLine: 'No.12, 10TH Main Adarsha Layout, Jnanajyothinagar, Mallathalli, Bangalore-560056',
  phone1: '080 29916452',
  phone2: '8971376452 | 94498 66452',
  email: 'info@dakshelevators.in',
  website: 'dakshelevators.in',
  footerTagline: 'Yours Trusted Elevators Partners',
  bank: {
    beneficiaryName: 'DAKSH ELEVATORS PRIVATE LIMITED',
    accountNo: '50200111784462',
    bankName: 'HDFC',
    branch: 'ULLAL MAIN ROAD BRANCH',
    ifsc: 'HDFC0001152',
  },
  contactPersonForPayment: {
    name: 'Dinesh S V',
    designation: 'Managing Director',
    mobile: '9449866452',
  },
  defaultGstPercent: 18,
};
