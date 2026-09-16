// Everything here is the ~85% of the document that is IDENTICAL on every
// quotation. It never touches the form. If Daksh's standard terms change,
// you edit it in exactly one place and every future quotation picks it up.
// Sourced verbatim from the 13-page sample PDF.

export const materialOverview: { component: string; details: string }[] = [
  { component: 'MOTOR', details: 'Imported Gearless PMS Motor with Dual Brake System & Double Magnetic Circuits for Extra Safety.' },
  { component: 'ENCODER', details: 'ERN 1387 German Encode' },
  { component: 'DRIVE', details: 'Auto Frequency VVVF Drive' },
  { component: 'CONTROLLER', details: 'Microprocessor based Smart Controller' },
  { component: 'Automatic Rescue Device (ARD)', details: 'Power Failure Detection, Intelligent monitoring with Emergency Communication Capabilities for enhanced safety.' },
  { component: 'ROPE', details: 'High-Performance Elevator Ropes for better Stability & Durability' },
  { component: 'GUIDE RAILS', details: 'Heavy Duty Rust Proof Magnetic Casted Iron Rails used for Long Lasting, Safe & Comfort ride. (Italy)' },
  { component: 'BRAKES', details: 'Dual Magnetic Braking System' },
  { component: 'DOOR OPERATOR', details: 'High-Performance Operator for Smooth and reliable Operation.' },
  { component: 'TRAVELLING CABLE', details: 'Cables with High Flexibility, Heat & Fire Resistance, Weatherproof Specialized Insulation for Constant motion.' },
  { component: 'STEEL', details: 'Stainless Steel of 304 Grade, Rust Proof with 1.2 mm Thickness.' },
  { component: 'LIGHTS', details: 'LED Lighting Fixtures (Indian ISI Standard)' },
  { component: 'BLOWER FAN', details: 'Auto Airflow adjustable Blower Fan with auto cooling option for better air quality and air circulation.' },
  { component: 'ADDITIONAL SAFETY FEATURES', details: '2 nos. UCM Safety Blocks with Clutch Rods' },
  { component: 'Operating LOP and COP', details: 'Wall Mounted Flush Button with Braille.' },
];

export const addOnFeatures: { title: string; description: string }[] = [
  { title: 'Wall Mounted Feather TOUCH Panels', description: 'for better Aesthetics.' },
  { title: 'IoT Technology', description: 'Smart IoT-enabled elevator monitoring system for real-time equipment status, fault alerts, performance monitoring, preventive maintenance notifications, and remote diagnostics.' },
  { title: 'Biometric Access Control', description: 'Advanced fingerprint/face-based access control integrated with the elevator system, enabling secure and authorized floor access. User permissions can be configured according to individual access requirements.' },
  { title: 'Emergency Intercom System', description: 'Two-way voice communication system installed inside the elevator cabin, enabling passengers to communicate with the designated security/reception/control point during emergencies or elevator stoppage.' },
];

export const proposalIncludes: string[] = [
  'Technical Specifications',
  'Standard Safety Features',
  'Scope of Supply',
  'Customer Scope of Work',
  'Commercial Terms',
  'Warranty & Maintenance',
];

export const commercialTermsAndConditions: string[] = [
  'ALL THE PAYMENTS / TRANSACTIONS SHOULD BE MADE TO THE FOLLOWING BANK DETAILS-',
];

export const bankDetailsNotes: string[] = [
  'BENEFICIARY NAME WOULD BE DAKSH ELEVATORS PRIVATE LIMITED AND IT WOULD NOT CHANGE.',
  'REQUEST CLIENTS TO INFORM IMMEDIATELY TO THE CONCERNED PERSON AFTER TRANSACTIONS ARE COMPLETED.',
  'IN CASE, DAKSH ELEVATORS CHANGES THE BANK, IT WOULD BE INTIMATED TO THE CLIENTS IN WRITING ALONG WITH THE BANK LETTER',
];

// ── Page: Standard Safety Features ─────────────────────────────
export const standardSafetyFeatures: { title: string; description: string }[] = [
  { title: 'Automatic Rescue Device (ARD)', description: 'Moves the elevator to the nearest floor during a power failure and opens the doors.' },
  { title: 'Overload Protection', description: 'Prevents operation when the rated load capacity is exceeded.' },
  { title: 'Door Safety Sensor', description: 'Detects obstructions and prevents the doors from closing.' },
  { title: 'Emergency Alarm', description: 'Provides an alarm facility for passengers during an emergency.' },
  { title: 'Emergency Lighting', description: 'Provides temporary cabin illumination during a power failure.' },
  { title: 'SAFETY CLUTCH SYSTEM WITH OVERSPEED GOVERNOR', description: 'A mechanical safety system designed to activate in the event of overspeed or abnormal downward movement of the elevator car, helping to stop and securely hold the car on the guide rails' },
  { title: 'Safety Gear', description: 'Stops and securely holds the elevator car in case of abnormal movement.' },
  { title: 'Buffer System', description: 'Provides protection at the bottom of the elevator shaft.' },
  { title: 'Phase Failure & Reversal Protection', description: 'Protects against phase failure, reversal and electrical irregularities.' },
  { title: 'Automatic Door Reopening', description: 'Reopens the doors when an obstruction is detected.' },
  { title: 'Door Locking & Electrical Interlock', description: 'Prevents elevator movement unless landing doors are properly closed and locked.' },
  { title: 'Emergency Stop Facility', description: 'Allows the elevator to be stopped during emergency or maintenance situations.' },
  { title: 'Controller Safety Protection', description: 'Provides built-in monitoring and protection for safe operation.' },
];



export const additionalSafetyFeaturesList: string[] = [
  '2-Way Intercom System',
  'IoT-Enabled Remote Monitoring',
  'Biometric Access Control',
  'RFID / Card Access System',
  'CCTV Camera Provision',
];

// ── Page: Daksh Elevators – Scope of Work ──────────────────────
export const scopeOfWorkIntro =
  'Daksh Elevators Private Limited shall undertake the supply, installation, testing and commissioning of the elevator system in accordance with the approved quotation, technical specifications, approved General Arrangement Drawing (GAD) and mutually agreed scope of supply.';

export const daksScopeItems: { title: string; description: string }[] = [
  { title: '1. Supply of Elevator Equipment', description: 'Supply of all elevator components, equipment and accessories specifically mentioned in the approved quotation, including the elevator car, landing doors, guide rails, controller, motor, suspension system and other standard safety components.' },
  { title: '2. Installation & Erection', description: 'Complete erection and installation of the supplied elevator equipment, including installation of guide rails, landing doors, elevator car, counterweight system, controller and associated components.' },
  { title: '3. Electrical Work Within Elevator Scope', description: "Internal electrical wiring, travelling cable connections and electrical connections required between the supplied elevator components shall be carried out by Daksh Elevators. Main power supply up to the controller shall be under the Customer's scope." },
  { title: '4. Testing & Commissioning', description: 'After completion of installation and availability of the required power supply, Daksh Elevators shall carry out necessary testing, adjustments and commissioning of the elevator for proper operation.' },
  { title: '5. Safety Features', description: 'Supply and installation of standard safety devices and additional safety features, wherever specifically included in the approved quotation and technical specification.' },
  { title: '6. Documentation & Technical Support', description: 'Daksh Elevators shall provide the relevant technical documents and reasonable assistance required for installation, testing and statutory inspection, wherever applicable.' },
  { title: '7. Free Maintenance & Warranty', description: 'The elevator includes 12 months Free Maintenance as per the agreed maintenance schedule. Warranty shall be provided as specified in the quotation and shall be subject to the applicable warranty terms and a valid AMC with Daksh Elevators Private Limited.' },
];

export const scopeExclusions: string[] = [
  'All civil, structural and preparatory works, elevator shaft construction, waterproofing, main electrical supply, earthing, scaffolding, material storage, statutory fees, government approvals and other works specified under CUSTOMER SCOPE OF WORK shall be carried out by the Customer.',
  'Any work, material, equipment or service not specifically mentioned in the approved quotation shall be considered outside the scope of Daksh Elevators and shall be chargeable separately, subject to mutual approval.',
];

// ── Page: Customer Scope of Work (Site Preparation – Civil & Electrical) ──
export const customerScopeIntro =
  "The Customer shall complete all necessary civil, structural, and electrical preparatory works at their own cost and responsibility, as per the approved General Arrangement Drawing (GAD) issued by Daksh Elevators Private Limited. Elevator installation shall commence only after the site is ready and handed over to Daksh Elevators. Any delay in Customer's scope may result in corresponding extension of the project schedule and additional costs, if applicable.";

export interface CustomerScopeGroup {
  groupHeading?: string;    // e.g. "CIVIL WORK" / "ELECTRICAL WORK" / "STATUTORY REQUIREMENTS"
  heading: string;          // e.g. "A. Elevator Shaft & Pit"
  items: string[];
}

export const customerScopeGroups: CustomerScopeGroup[] = [
  {
    groupHeading: 'CIVIL WORK :',
    heading: 'A. Elevator Shaft & Pit',
    items: [
      'Shaft to be constructed as per approved GAD, properly plastered, finished, plumb and free from obstructions.',
      'Pit to be waterproof, dry, clean, and completed with required structural provisions.',
      'Required buffer foundations, supports and RCC works to be provided as per GAD.',
    ],
  },
  {
    heading: 'B. Landing & Finishing',
    items: [
      'Landing openings, lintels, and structural supports as per GAD.',
      "Entrance architrave, plastering, painting and final finishing around landing doors are in Customer's scope.",
      'Required chipping, drilling, grouting and making-good works to be carried out by Customer.',
    ],
  },
  {
    heading: 'C. Shaft Lighting & Scaffolding',
    items: [
      'Adequate shaft and pit lighting to be provided. (Bulkhead light)',
      'Safe scaffolding to be provided during installation wherever required.',
    ],
  },
  {
    heading: 'D. Storage',
    items: [
      'Safe, dry, lockable and weatherproof storage area to be provided near the elevator shaft.',
      'Customer shall be responsible for protection and security of materials stored at site until installation/handover.',
    ],
  },
  {
    groupHeading: 'ELECTRICAL WORK',
    heading: 'E. Power Supply',
    items: [
      'Required 415V, 3-Phase, 50Hz AC power supply and single-phase supply for auxiliary requirements to be provided as per approved electrical layout.',
      'Suitable MCB/ELCB/RCCB protection and cabling to be provided by Customer.',
      'Permanent and stable power supply shall be available for testing and commissioning.',
    ],
  },
  {
    heading: 'F. Earthing',
    items: [
      'Two separate and effective earthing connections to be provided exclusively for the elevator.',
      'Earthing shall comply with applicable standards and approved electrical requirements.',
    ],
  },
  {
    heading: 'G. Equipment / Structural Provisions',
    items: [
      'Required hoisting beam/hook, machine-support channels and structural members shall be provided as per GAD wherever applicable.',
      'For MRL elevators, required overhead and equipment-area provisions shall be completed as per approved GAD.',
    ],
  },
  {
    groupHeading: 'STATUTORY REQUIREMENTS',
    heading: 'H. Approvals & Licence',
    items: [
      'Applicable statutory inspection, approval and lift licence shall be obtained by the Customer.',
      'Government fees, inspection charges and statutory expenses shall be borne by the Customer.',
      'Daksh Elevators shall provide necessary technical assistance/documents for statutory inspection.',
    ],
  },
];

export const customerScopeImportantNote =
  'All civil, structural, electrical and preparatory works shall be completed strictly as per the approved GAD and instructions issued by Daksh Elevators Private Limited. Any deviation from approved dimensions may affect installation, performance, schedule and cost.';

// ── Page: Payment Terms & Contract Execution Schedule ──────────
export const paymentTerms: { title: string; description: string }[] = [
  { title: '20% ADVANCE PAYMENT', description: 'Payable at the time of order confirmation.' },
  { title: '70% PRODUCTION & DISPATCH PAYMENT', description: 'Payable during production and before dispatch of the elevator materials to the project site.' },
  { title: '10% INSTALLATION / COMMISSIONING BALANCE', description: 'Payable before final commissioning and handover of the elevator.' },
];

export const contractExecutionIntro: string[] = [
  'The execution of contract shall commence from the date of receipt or technically and commercially clear signed agreement in all respects along with advance payments as per the terms of payment.',
  'The estimated completion time shall be 60 working days from the day site is handed over to us after completion of all Civil and Electrical works as per CAD drawing shared and this can be broadly categorized as under:',
];

export const executionStages: { title: string; description: string }[] = [
  { title: '1) Detailed CAD Drawing', description: 'The final CAD drawing which shall be submitted by us within 4 - 5 Working Days after the agreement is mutually signed and on receipt of your building drawing for our reference.' },
  { title: '2) Manufacture & Delivery', description: 'This shall be completed in about 30 days, subject to your furnishing us clear dispatch instructions well in advance and clearing all due payments as per the agreed terms of payment. The elevator shaft, pit and machine room complete in all respects and as per the approved layout drawing are to be handed over to us at least one week before the readiness of the material.' },
  { title: '3) Installation, Testing and commissioning', description: 'The installation, testing, and commissioning of the elevator shall be completed within approximately 30 working days from the date of material availability at the site and readiness of the site for installation.' },
  { title: '4) Handing Over', description: "Elevator will be handed over as soon as the erection and testing is completed. Our erection crew will test and adjust the elevator/s and will give you about a week's prior notice for your taking over the elevator." },
];

// ── Page: General Terms & Conditions ───────────────────────────
export const warrantyTable: { component: string; period: string }[] = [
  { component: 'Mechanical Parts', period: '10 Years' },
  { component: 'Motor', period: '3 Years' },
  { component: 'Electrical Parts', period: '1 Year' },
];

export const warrantyNotes: string[] = [
  'The above warranty shall remain valid only when the elevator is covered under a valid Annual Maintenance Contract (AMC) with Daksh Elevators Private Limited throughout the applicable warranty period.',
  'The Customer shall renew the AMC continuously with Daksh Elevators after completion of the Free Maintenance period. If the AMC is not renewed or is terminated, the applicable warranty shall become null and void from the date of expiry/termination of the AMC.',
  'Warranty claims shall be subject to inspection and verification by an authorized Daksh Elevators representative.',
  'The warranty covers manufacturing defects in the respective components under normal operating conditions and proper maintenance.',
  'The warranty shall not cover damage or failure caused by normal wear and tear, negligence, misuse, accidents, vandalism, unauthorized modification or servicing, improper electrical supply, inadequate earthing, water leakage, fire, rodents/pests, natural calamities, or any other cause beyond the reasonable control of Daksh Elevators.',
];

export const freeMaintenanceNotes: string[] = [
  'The offer includes 12 months Free Maintenance from the date the elevator erection is completed and the elevator is offered for inspection/handover.',
  'Free Maintenance includes periodic inspection, necessary adjustments, lubrication and breakdown assistance by authorized Daksh Elevators personnel.',
  'For Residential Elevators, periodic maintenance shall be carried out once every 45 days.',
  'For Commercial / Goods Elevators, periodic maintenance shall be carried out once every 30 days.',
  'Replacement of parts required due to normal wear and tear, misuse, negligence, accidents or external damage shall be chargeable.',
  'The commencement of the Free Maintenance period shall remain unchanged irrespective of delays in building completion, availability of permanent power supply, statutory inspection, taking over or use of the elevator.',
];

export const deliveryInstallationIntro =
  'The delivery and installation schedule shall be applicable from the date specified in the commercial proposal, subject to:';

export const deliveryInstallationConditions: string[] = [
  'Receipt of required payments.',
  'Approval of drawings and technical specifications.',
  "Completion of Customer's civil and electrical works.",
  'Availability of suitable storage.',
  'Availability of required power supply.',
  'Site readiness and safe working conditions.',
];

export const deliveryInstallationNote =
  "Any delay caused by factors outside Daksh Elevators' control shall extend the delivery and installation schedule accordingly.";

export const materialStorageNotes: string[] = [
  'The Customer shall provide a safe, dry, clean, lockable and weather-protected storage area for elevator materials before dispatch.',
  'The Customer shall be responsible for the security and protection of materials stored at site until installation and handover.',
  'Any loss, theft, damage, water damage or deterioration of material due to site conditions or inadequate security shall be chargeable to the Customer.',
];

export const intellectualPropertyNotes: string[] = [
  'All drawings, designs, software, control systems, technical documents and other intellectual property supplied by Daksh Elevators shall remain the property of Daksh Elevators or its respective technology/component suppliers.',
  'The Customer shall not reproduce, modify, reverse engineer, distribute or commercially use such intellectual property without prior written permission.',
];

export const statutoryApprovalsNotes: string[] = [
  'The Customer shall obtain all applicable statutory approvals, inspections and licences required for operation of the elevator.',
  'Daksh Elevators shall provide reasonable technical assistance and documents required for the inspection process.',
  'The elevator shall not be operated without the required statutory approval or licence.',
];

export const generalConditionsNotes: string[] = [
  'The approved quotation, technical specifications, Customer Scope of Work, GAD and these General Terms & Conditions shall together constitute the agreement between the parties.',
  'Any amendment or variation to the agreed scope shall be valid only when confirmed in writing by Daksh Elevators.',
  'The Customer shall not assign or transfer the contract to any third party without prior written consent from Daksh Elevators.',
];

export const cancellationIntro =
  "As elevators are designed, manufactured and procured according to the Customer's specific requirements, cancellation charges shall apply based on the stage of the project:";

export const cancellation: { stage: string; charge: string }[] = [
  { stage: 'After Order / Contract Confirmation', charge: '10% of Contract Value' },
  { stage: 'After Site Survey / Drawing Approval', charge: '25% of Contract Value' },
  { stage: 'After Release to Production', charge: '50% of Contract Value' },
  { stage: 'After Manufacturing & Before Dispatch', charge: '75% of Contract Value' },
  { stage: 'After Dispatch / Installation Commencement', charge: '100% of Contract Value' },
];

// The client/company acceptance block appears at the bottom of several
// pages (Commercial Proposal, Customer Scope of Work, Contract Execution
// Schedule, Cancellation Terms). Modeled once, rendered wherever it recurs.
export const acceptanceBlock = {
  clientLabel: 'Accepted by client.',
  companyLabel: 'Accepted By Daksh Elevators PVT. LTD',
};
