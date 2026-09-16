import type { QuotationData, CompanySettings } from '../types/quotation';

import { specLabels } from '../data/specOptions';
import {
  materialOverview, addOnFeatures, proposalIncludes, bankDetailsNotes,
  standardSafetyFeatures, additionalSafetyFeaturesList,
  scopeOfWorkIntro, daksScopeItems, scopeExclusions,
  customerScopeIntro, customerScopeGroups, customerScopeImportantNote,
  paymentTerms, contractExecutionIntro, executionStages,
  warrantyTable, warrantyNotes, freeMaintenanceNotes,
  deliveryInstallationIntro, deliveryInstallationConditions, deliveryInstallationNote,
  materialStorageNotes, intellectualPropertyNotes, statutoryApprovalsNotes,
  generalConditionsNotes, cancellationIntro, cancellation, acceptanceBlock,
} from '../data/fixedContent';
import { calculateTotals, formatINR } from '../utils/calc';

interface Props {
  data: QuotationData;
  company: CompanySettings;
}

// This renders the SAME page shape used for the PDF (see QuotationPDF.tsx),
// just as HTML/CSS instead of @react-pdf primitives. Keep the two visually
// in sync by hand — they intentionally don't share JSX because react-pdf
// only understands its own primitives (View/Text), not arbitrary DOM.
// 12 pages, matching the sample PDF's pagination 1:1.

function Header({ company }: { company: CompanySettings }) {
  return (
    <div className="q-header">
      <img src={company.logoUrl} alt={company.name} className="q-logo" />
      <div>
        <div className="q-company-name">{company.name}</div>
        <div className="q-tagline">{company.tagline}</div>
      </div>
    </div>
  );
}

function Footer({ company }: { company: CompanySettings }) {
  return (
    <div className="q-footer">
      <div className="q-footer-address center">{company.addressLine}</div>
      <div className="q-footer-line center">
        Tele: {company.phone1} &nbsp; 📞 {company.phone2} &nbsp; ✉ {company.email} &nbsp; 🌐 {company.website}
      </div>
      <div className="q-footer-tagline">{company.footerTagline}</div>
    </div>
  );
}

function Watermark({ company }: { company: CompanySettings }) {
  return <img src={company.logoUrl} alt="" className="q-watermark" aria-hidden />;
}

// A "page" wrapper so every page gets header + watermark + footer identically.
function Page({ company, children }: { company: CompanySettings; children: React.ReactNode }) {
  return (
    <div className="q-page">
      <Header company={company} />
      <Watermark company={company} />
      <div className="q-content">{children}</div>
      <Footer company={company} />
    </div>
  );
}

// The "Accepted by client / Accepted by Daksh Elevators" block recurs on
// several pages throughout the sample (Commercial Proposal, Customer Scope
// of Work, Contract Execution Schedule, Cancellation Terms) — modeled once.
function AcceptanceBlock() {
  return (
    <table className="q-accept-table">
      <thead>
        <tr><th>{acceptanceBlock.clientLabel}</th><th>{acceptanceBlock.companyLabel}</th></tr>
      </thead>
      <tbody>
        <tr><td>Name:</td><td>Name:</td></tr>
        <tr><td>Date:</td><td>Date:</td></tr>
        <tr><td>Signature<br />With Seal:</td><td>Signature<br />With Seal:</td></tr>
      </tbody>
    </table>
  );
}

export default function QuotationPreview({ data, company }: Props) {
  const totals = calculateTotals(data.priceLines);
  const specEntries = Object.entries(specLabels) as [keyof typeof specLabels, string][];

  // The spec table is grouped under the same three headings as the sample
  // (Available Civil Dimensions / Elevators Specification / Car Design) —
  // this keeps the on-screen layout matching the source document instead
  // of one long flat table.
  const civilDimKeys = ['hoistWayWidth', 'hoistWayDepth', 'pitDepth', 'floorToFloorHeight', 'overheadHeight'] as const;
  const carDesignKeys = ['carWallPanel', 'carFloor', 'falseCeiling'] as const;
  const elevatorSpecEntries = specEntries.filter(
    ([key]) => !civilDimKeys.includes(key as any) && !carDesignKeys.includes(key as any)
      && !['carDoorType', 'landingDoorType', 'operatingPanelType'].includes(key)
  );
  const carDesignEntries = specEntries.filter(([key]) => carDesignKeys.includes(key as any));

  return (
    <div className="q-preview">
      {/* Page 1: cover letter */}
      <Page company={company}>
        <h2 className="q-title">Quotation</h2>
        <br />
        <div className="q-meta-row">
          <div><strong>Quotation No:</strong> {data.quotationNo}</div>
          <div><strong>Date:</strong> {data.date}</div>
        </div>
        <p><strong>To,</strong>
          <br />
          {data.customer.salutation} {data.customer.customerName}</p>
        <br />
        <p><strong>Address:</strong> {data.customer.address}</p>
        <br />
        <p>Dear Sir,</p>
        <p>{data.subject}</p>
        <br />
        <p>Greetings from <strong>Daksh Elevators Private Limited</strong>.</p>
        <br />
        <p>Thank you for giving <strong>Daksh Elevators Private Limited.</strong> the opportunity to be associated with your prestigious project.</p>
        <br />
        <p>We are committed to executing every project with a strong focus on <strong>quality, safety, timely completion and customer satisfaction</strong>. Our team will coordinate with the customer and project stakeholders throughout the installation and commissioning process to ensure professional and efficient project execution.</p>
        <br />
        <p>We hope this proposal meets your requirements and provides a clear understanding of our offering. Should you require any clarification, technical discussion or modification to the proposal, our team will be pleased to assist you.</p>
        <br />
        <p>Our proposal includes :</p>
        <br />
        <ul>{proposalIncludes.map((item) => <li key={item}>{item}</li>)}</ul>
        <br />
        <p>Terms &amp; Conditions Should you require any clarification or additional information, please feel free to contact us at any time. Thank you for your valuable consideration and we look forward to serving you.</p>
        <br />
        <p>Warm Regards,<br /><strong>Daksh Elevators Private Limited</strong></p>
        <p className="q-signature-line">Authorized Signature</p>
      </Page>

      {/* Page 2: commercial proposal + bank details + payment contact + acceptance */}
      <Page company={company}>
        <h3 className="q-section-title">Commercial Proposal</h3>
        <table className="q-table">
          <thead>
            <tr>
              <th>
                <strong>WE PROPOSE</strong>{" "}
                <span style={{ fontWeight: "normal" }}>
                  to Supply, Install, Test and Commission of elevator outlined in the foregoing proposal
                </span>
              </th>
              <th>Qty</th>
              <th>Basic Price</th>
              <th>GST@18%</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {data.priceLines.map((line) => {
              const basic = line.qty * line.basicPrice;
              const gst = (basic * line.gstPercent) / 100;
              return (
                <tr key={line.id}>
                  <td>{line.description}</td>
                  <td>{line.qty}</td>
                  <td>{formatINR(line.basicPrice)}</td>
                  <td>{formatINR(gst)} ({line.gstPercent}%)</td>
                  <td>{formatINR(basic + gst)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="q-words"><strong>Rupees In Word:</strong> {totals.grandTotalInWords}</p>

        <h6 className="q-section-title">Commercial Terms and Conditions for Contract</h6>
        <br />
        <ul><li>ALL THE PAYMENTS / TRANSACTIONS SHOULD BE MADE TO THE FOLLOWING BANK DETAILS</li></ul>

        <h4 className="q-section-title">Bank Details</h4>
        <table className="q-table">
          <tbody>
            <tr><td>BENEFICIARY NAME</td><td>{company.bank.beneficiaryName}</td></tr>
            <tr><td>ACCOUNT NO</td><td>{company.bank.accountNo}</td></tr>
            <tr><td>BANK NAME</td><td>{company.bank.bankName}</td></tr>
            <tr><td>BRANCH NAME AND ADDRESS</td><td>{company.bank.branch}</td></tr>
            <tr><td>IFSC</td><td>{company.bank.ifsc}</td></tr>
          </tbody>
        </table>
        <ul>{bankDetailsNotes.map((n) => <li key={n}>{n}<br /></li>)}</ul>

        <h4 className="q-section-title">Contact Person for Payment Confirmation</h4>
        <br />
        <p>
          <strong>Name:</strong> {company.contactPersonForPayment.name} &nbsp;
          <br />
          <strong>Designation:</strong> {company.contactPersonForPayment.designation} &nbsp;
          <strong>Mobile:</strong> {company.contactPersonForPayment.mobile}
        </p>
        <AcceptanceBlock />
      </Page>

      {/* Page 3: specifications */}
      <Page company={company}>
        <table className="q-kv-table">
          <tbody>
            <tr>
              <td>Supply, Installation, Testing &amp; Commissioning of Passenger Elevator For your <strong>Project At:</strong></td>
              <td>{data.customer.projectSiteAddress}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="q-section-title">Equipment Specification</h3>
        <p className="q-table-heading">Available Civil Dimensions</p>
        <table className="q-kv-table">
          <tbody>
            {civilDimKeys.map((key) => (
              <tr key={key}><td>{specLabels[key]}</td><td>{data.specs[key]}</td></tr>
            ))}
          </tbody>
        </table>

        <p className="q-table-heading">Elevators Specification</p>
        <table className="q-table">
          <tbody>
            {elevatorSpecEntries.map(([key, label]) => (
              <tr key={key}><td>{label}</td><td>{data.specs[key]}</td></tr>
            ))}
          </tbody>
        </table>

        <p className="q-table-heading">Car Design</p>
        <table className="q-table">
          <tbody>
            {carDesignEntries.map(([key, label]) => (
              <tr key={key}><td>{label}</td><td>{data.specs[key]}</td></tr>
            ))}
          </tbody>
        </table>
        {/* <p><strong>CAR DOORS:</strong> {data.specs.carDoorType}</p>
        <p><strong>LANDING DOORS:</strong> {data.specs.landingDoorType}</p>
        <p><strong>CAR &amp; HALL OPERATING PANEL:</strong> {data.specs.operatingPanelType}</p> */}
        <table className="q-table">
          <tbody>
            <tr><td><strong>CAR DOORS :</strong></td><td>Stainless Steel with SPL Panel on the rear end centre panel</td></tr>
            <tr><td><strong>LANDING DOORS :</strong></td><td>PVC(Floor Sheet) OR In client's scope. Recess 20 mm to be provided For Tiles</td></tr>
            <tr><td><strong>CAR &amp; HALL OPERATING PANEL :</strong></td><td>Minimalistic Car & Hall Operating Panel (SS - Button System) TEK 306 (Flush) and TXK (Surface Mounted)</td></tr>
          </tbody>
        </table>

      </Page>

      {/* Page 4: material overview + add-ons */}
      <Page company={company}>
        <h3 className="q-section-title">Material Overview</h3>
        <br />
        <table className="">
          <thead><tr><th>Component</th><th>Details</th></tr></thead>
          <br />
       
          <tbody>
            {materialOverview.map((m) => (
              <tr key={m.component}>
                <td style={{ padding: "8px 8px" }}><strong>{m.component}</strong></td>
                <td style={{ padding: "8px 8px" }}>{m.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4 className="q-section-title">Add On Features</h4>
        <br />
        
        {addOnFeatures.map((f) => (
          <p key={f.title} style={{ marginBottom: "16px" }}>
            <strong>{f.title}:</strong> {f.description}
          </p>
        ))}
      </Page>

      {/* Page 5: standard + additional safety features */}
      <Page company={company}>
        <h3 className="q-section-title">Standard Safety Features</h3>
        <br />
       
        <ul>
          {standardSafetyFeatures.map((f) => (
            <li key={f.title} style={{ marginBottom: "16px" }}>
              <strong>{f.title}:</strong> {f.description}
            </li>
          ))}
        </ul>
        <h3 className="q-section-title">Additional Safety Features</h3>
        <br />
        <p>The following features can be provided as <strong>optional upgrades at an additional cost,</strong> subject to the approved quotation and elevator configuration:</p>
        <br />
        <ul>{additionalSafetyFeaturesList.map((f) => <li key={f} style={{ marginBottom: "10px" }}><strong>{f}</strong></li>)}</ul>
      </Page>

      {/* Page 6: Daksh Elevators – Scope of Work */}
      <Page company={company}>
        <h3 className="q-section-title">Daksh Elevators – Scope of Work</h3>
        <br />
        <p>{scopeOfWorkIntro}</p>
        <br />
        <p className="q-table-heading">Daksh Elevators Scope Includes:</p>
        <br />
        {daksScopeItems.map((item) => (
          <p key={item.title} style={{ marginBottom: "14px" }}><strong>{item.title}</strong><br />{item.description}</p>
        ))}
        <h4 className="q-section-title">Exclusions</h4>
        <br />
        {scopeExclusions.map((p, i) => <p key={i} style={{ marginBottom: "14px" }}>{p}</p>)}
      </Page>

      {/* Page 7: Customer Scope of Work — civil work */}
      <Page company={company}>
        <h3 className="q-title text-blue ">Site Preparation – Civil &amp; Electrical</h3>
        <h4 className="q-section-title">Customer Scope of Work</h4>
        <br />
        <p>{customerScopeIntro}</p>
        {customerScopeGroups.slice(0, 4).map((group) => (
          <div key={group.heading}>
            <br />
            {group.groupHeading && <p className="q-heading"><strong>{group.groupHeading}</strong></p>}
            <br />
            <p><strong>{group.heading}</strong></p>
            <br />
            <ul>{group.items.map((it) => <li key={it} style={{ marginBottom: "10px" }}>{it}</li>)}</ul>
          </div>
        ))}
      </Page>

      {/* Page 8: Customer Scope of Work — electrical + statutory + acceptance */}
      <Page company={company}>
        {customerScopeGroups.slice(4).map((group) => (
          <div key={group.heading}>
            {group.groupHeading && <p className="q-heading"><strong>{group.groupHeading}</strong></p>}
            <br />
            <p><strong>{group.heading}</strong></p>
            <br />
            <ul>{group.items.map((it) => <li key={it} style={{ marginBottom: "10px" }}>{it}</li>)}</ul>
          </div>
        ))}
        <h4 className="q-section-title">Important Note</h4>
        <br />
        <p><strong>{customerScopeImportantNote}</strong></p>
        <br />
        <AcceptanceBlock />
      </Page>

      {/* Page 9: payment terms + contract execution schedule + acceptance */}
      <Page company={company}>
        <h3 className="q-section-title">Payment Terms</h3>
        <br />
        <ol>
          {paymentTerms.map((p) => (
            <li key={p.title} style={{ marginBottom: "12px" }}><strong>{p.title}:</strong> {p.description}</li>
          ))}
        </ol>
        <br />
        <h3 className="q-section-title">Contract Execution Schedule</h3>
        <br />
        {contractExecutionIntro.map((p, i) => <p key={i}>{p}</p>)}
        <br />
        {executionStages.map((s) => (
          <p key={s.title} style={{ marginBottom: "12px" }}><strong>{s.title}:<br /></strong><br />{s.description}</p>
        ))}
        <br />
        <AcceptanceBlock />
      </Page>

      {/* Page 10: General T&C — warranty + free maintenance */}
      <Page company={company}>
        <h3 className="q-section-title">General Terms &amp; Conditions</h3>
        <h4 className="q-section-title">1. Warranty Period &amp; AMC Condition</h4>
        <br />
        <p>{company.name} provides the following warranty coverage:</p>
        <br />
        <table className="q-table">
          <br />
          <thead><tr><th>Component</th><th>Warranty Period</th></tr></thead>
          <tbody>
            {warrantyTable.map((w) => (
              <tr key={w.component} style={{ marginBottom: "10px" }}><td>{w.component} </td><td>{w.period}</td></tr>
            ))}
          </tbody>
        </table>
        {warrantyNotes.map((p, i) => <p key={i} style={{ marginBottom: "10px" }}>{p}</p>)}

        <h4 className="q-section-title">2. Free Maintenance</h4>
        <br />
        {freeMaintenanceNotes.map((p, i) => <p key={i} style={{ marginBottom: "10px" }}>{p}</p>)}
      </Page>

      {/* Page 11: delivery & installation, material storage, IP, statutory approvals */}
      <Page company={company}>
        <h4 className="q-section-title">3. Delivery &amp; Installation</h4>
        <br />
        <p>{deliveryInstallationIntro}</p>
        <br />
        <ul>{deliveryInstallationConditions.map((c) => <li key={c} style={{ marginBottom: "8px" }}>{c}</li>)}</ul>
        <p>{deliveryInstallationNote}</p>

        <h4 className="q-section-title">4. Material Storage &amp; Site Security</h4>
        <br />
        {materialStorageNotes.map((p, i) => <p key={i} style={{ marginBottom: "10px" }}>{p}</p>)}

        <h4 className="q-section-title">5. Intellectual Property</h4>
        <br />
        {intellectualPropertyNotes.map((p, i) => <p key={i} style={{ marginBottom: "10px" }}>{p}</p>)}

        <h4 className="q-section-title">6. Statutory Approvals</h4>
        <br />
        {statutoryApprovalsNotes.map((p, i) => <p key={i} style={{ marginBottom: "10px" }}>{p}</p>)}
      </Page>

      {/* Page 12: general conditions + cancellation terms + acceptance */}
      <Page company={company}>
        <h4 className="q-section-title">7. General Conditions</h4>
        <br />
        {generalConditionsNotes.map((p, i) => <p key={i} style={{ marginBottom: "10px" }}>{p}</p>)}
        <br />

        <h3 className="q-section-title">Cancellation Terms</h3>
        <br />
        <p>{cancellationIntro}</p>
        <br />
        <table className="q-accept-table">
          <thead><tr><th>Stage of Cancellation</th><th>Cancellation Charges</th></tr></thead>
          <tbody>
            {cancellation.map((c) => (
              <tr key={c.stage} style={{ marginBottom: "10px" }}><td>{c.stage}</td><td>{c.charge}</td></tr>
            ))}
          </tbody>
        </table>
        <br />
        <AcceptanceBlock />
      </Page>
    </div>
  );
}
