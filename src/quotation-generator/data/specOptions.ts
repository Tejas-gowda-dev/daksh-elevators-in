import type { SpecFieldKey } from '../types/quotation';

// Add / remove values here and the form dropdown updates automatically —
// nobody has to touch QuotationForm.tsx to change what's selectable.
// A field with NO entry here just renders as a free-text input in the form
// (see QuotationForm.tsx: `options ? <select> : <input>`).
export const specOptions: Partial<Record<SpecFieldKey, string[]>> = {
  ratedLoad: ['272 Kg. 4 Passengers','408 Kg. 6 Passengers', '544 Kg. 8 Passengers', '680 Kg. 10 Passengers', '884 Kg. 13 Passengers','1020 Kg. 15 Passengers','1360 Kg. 20 Passengers'],
  numberOfAccessSides: [ "Single Side","Two Side"],

  ratedSpeed: ['0.5 M/Second', '1.00 M/Second'],
  machineType: [
    'Gearless Traction machine to be placed directly above inside the hoist way (MRL)',
    'Geared Traction Machine shall be installed inside the designated Machine Room(MR)',
    'Hydraulic Power Unit to be placed adjacent to the hoistway or at a suitable location, with the hydraulic cylinder installed as per the lift design.(hydraulic)',
  ],
 
};

// Friendly labels for every field, used by both the form and the preview
// so a label is only ever written once.
export const specLabels: Record<SpecFieldKey, string> = {
  hoistWayWidth: 'Hoist way Width',
  hoistWayDepth: 'Hoist way Depth',
  pitDepth: 'Pit Depth',
  floorToFloorHeight: 'Floor-to-Floor Height',
  overheadHeight: 'Overhead Height',
  ratedLoad: 'Rated Load and Passenger Capacity',
  numberOfStops: 'Number of Stops & Openings',
  numberOfAccessSides: 'Number of Access Sides',
  floorDesignations: 'Floor Designations',
  totalTravelHeight: 'Total Travel Height',
  controlSystem: 'Control System',
  operation: 'Operation',
  ratedSpeed: 'Rated Speed of Travel',
  machineType: 'Machine',
  powerSupply: 'Power Supply',
  carSizeWidth: 'Car Size - Width (mm)',
  carSizeDepth: 'Car Size - Depth (mm)',
  carSizeHeight: 'Car Size - Height (mm)',
  clearOpeningWidth: 'Clear Opening - Width (mm)',
  clearOpeningHeight: 'Clear Opening - Height (mm)',
  carWallPanel: 'Car Wall Panel',
  carFloor: 'Car Floor',
  falseCeiling: 'False Ceiling',
  carDoorType: 'Car Doors',
  landingDoorType: 'Landing Doors',
  operatingPanelType: 'Car & Hall Operating Panel',
};

// Sensible starting values so a new quotation isn't full of blanks —
// user only edits what's different for this customer.
export const specDefaults: Record<SpecFieldKey, string> = {
  hoistWayWidth: '',
  hoistWayDepth: '',
  pitDepth: '',
  floorToFloorHeight: '',
  overheadHeight: '',
  ratedLoad: '',
  numberOfStops: '5 Stops & 5 Openings',
  numberOfAccessSides: '',
  floorDesignations: 'G,1,2,3,4',
  totalTravelHeight: '12 Meters',
  controlSystem: 'Micro Processor based AC 3VF close loop control',
  operation: 'Simplex full Collective',
  ratedSpeed: '',
  machineType: 'Gearless Traction machine to be placed directly above inside the hoist way (MRL)',
  powerSupply: '415 Volts, 3 Phase & 220 Volts, 1 Phase, 50 Hz. AC',
  carSizeWidth: '910',
  carSizeDepth: '720',
  carSizeHeight: '2135',
  clearOpeningWidth: '700',
  clearOpeningHeight: '2000',
  carWallPanel: 'Stainless Steel with SPL Panel on the rear end centre panel',
  carFloor: "PVC(Floor Sheet) OR In client's scope. Recess 20 mm to be provided For Tiles",
  falseCeiling: 'Stainless Steel Finish with LED lights',
  carDoorType: 'Power operated Telescopic opening in Stainless Steel Matte Finish',
  landingDoorType: 'Power operated Telescopic opening in Stainless Steel Matte Finish',
  operatingPanelType: 'Minimalistic Car & Hall Operating Panel (SS - Button System) TEK 306 (Flush) and TXK (Surface Mounted)',
};

 export const priceLineDescriptions: string[] = [
  "",
  'Electric traction 3VF passenger gearless MRL Elevator hairline finish',
  'Electric traction VF passenger geared Elevator hairline finish',
];
 
