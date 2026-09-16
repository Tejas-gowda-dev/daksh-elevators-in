// ─────────────────────────────────────────────────────────────
// Core data model. This single object is what gets:
//   - edited by the form
//   - stored in MongoDB (as-is, it's already JSON)
//   - rendered by the on-screen Preview
//   - rendered by the PDF generator
//   - written into the Excel export
// Keeping ONE shape used everywhere is what keeps preview/PDF/Excel in sync.
// ─────────────────────────────────────────────────────────────

export interface CompanySettings {
  name: string;
  tagline: string;
  logoUrl: string;          // used in header AND as the faded watermark
  addressLine: string;
  phone1: string;
  phone2: string;
  email: string;
  website: string;
  footerTagline: string;    // "Yours Trusted Elevators Partners"
  bank: {
    beneficiaryName: string;
    accountNo: string;
    bankName: string;
    branch: string;
    ifsc: string;
  };
  contactPersonForPayment: {
    name: string;
    designation: string;
    mobile: string;
  };
  defaultGstPercent: number; // 18
}

export interface CustomerDetails {
  salutation: 'Mr.' | 'Mrs.' | 'M/s.' | 'Mr./Mrs.';
  customerName: string;
  contactPerson?: string;
  address: string;
  projectSiteAddress?: string;
}

// A single priced line item in the commercial proposal table
export interface PriceLine {
  id: string;
  description: string;
  qty: number;
  basicPrice: number;     // per unit, or line total basic - decide one convention (see calc.ts)
  gstPercent: number;     // usually company default, but editable per line
}

// Every "spec" field is either free text or a dropdown.
// We model it as key -> value, and keep the list of *available* dropdown
// options separately (specOptions.ts) so the same field renders as a
// <select> in the form automatically.
export type SpecFieldKey =
  | 'hoistWayWidth' | 'hoistWayDepth' | 'pitDepth' | 'floorToFloorHeight' | 'overheadHeight'
  | 'ratedLoad' | 'numberOfStops' | 'numberOfAccessSides' | 'floorDesignations'
  | 'totalTravelHeight' | 'controlSystem' | 'operation' | 'ratedSpeed' | 'machineType'
  | 'powerSupply' | 'carSizeWidth' | 'carSizeDepth' | 'carSizeHeight'
  | 'clearOpeningWidth' | 'clearOpeningHeight'
  | 'carWallPanel' | 'carFloor' | 'falseCeiling'
  | 'carDoorType' | 'landingDoorType' | 'operatingPanelType';

export type SpecFields = Record<SpecFieldKey, string>;

export interface QuotationData {
  id: string;                 // mongo _id when saved
  status: 'draft' | 'final';
  quotationNo: string;        // auto-generated, e.g. DEPL/SA/1010
  date: string;                // ISO date, auto "today" by default but editable
  subject: string;             // "Supply, Installation, Testing & Commissioning of Passenger Elevator"

  customer: CustomerDetails;
  specs: SpecFields;
  priceLines: PriceLine[];

  // free-text overrides for the rare cases where fixed text needs a tweak
  // per quotation (keeps 90% fixed content truly fixed / not duplicated).
  notesOverride?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CalculatedTotals {
  basicTotal: number;
  gstTotal: number;
  grandTotal: number;
  grandTotalInWords: string;
}
