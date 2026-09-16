import { useRef, useState } from 'react';
import type { QuotationData } from '../types/quotation';
import { defaultCompanySettings } from '../data/companyConfig';
import { specDefaults } from '../data/specOptions';
import QuotationForm from './QuotationForm';
import QuotationPreview from './QuotationPreview';
import { exportQuotationToExcel } from '../utils/excelExport';
import { exportPagesToPdf } from '../utils/pdfExport';
import { saveDraft, listDrafts, loadDraft, deleteDraft, duplicateDraft } from '../utils/drafts';
import { getNextQuotationNumber, todayFormatted } from '../utils/quotationNumber';
import './quotation-print.css';

function blankQuotation(): QuotationData {
  const now = new Date().toISOString();
  return {
    id: '',
    status: 'draft',
    quotationNo: '',            // filled by QuotationForm's auto-generation effect
    date: '',
    subject: 'Supply, Installation, Testing & Commissioning of Passenger Elevator',
    customer: { salutation: 'Mr./Mrs.', customerName: '', address: '', projectSiteAddress: '' },
    specs: { ...specDefaults },
    priceLines: [],
    createdAt: now,
    updatedAt: now,
  };
}

export default function QuotationBuilder() {
  const [data, setData] = useState<QuotationData>(blankQuotation());
  const [isNew, setIsNew] = useState(true);
  const [tab, setTab] = useState<'edit' | 'preview' | 'drafts'>('edit');
  const [savedMsg, setSavedMsg] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const company = defaultCompanySettings;

  // Hidden live render of the quotation — the PDF is generated from THIS,
  // so the downloaded PDF is pixel-identical to the Preview tab.
  const pdfSourceRef = useRef<HTMLDivElement>(null);

  function handleSaveDraft() {
    const saved = saveDraft(data);
    setData(saved);
    setIsNew(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 1500);
  }

  function handleNewQuotation() {
    setData(blankQuotation());
    setIsNew(true);
    setTab('edit');
  }

  function handleOpenDraft(id: string) {
    const draft = loadDraft(id);
    if (draft) {
      setData(draft);
      setIsNew(false);
      setTab('edit');
    }
  }

  function handleDuplicate(id: string) {
    const copy = duplicateDraft(id);
    if (copy) {
      copy.quotationNo = getNextQuotationNumber();
      copy.date = todayFormatted();
      setData(copy);
      setIsNew(false); // has real content already, just needs saving under its new id
      setTab('edit');
    }
  }

  async function handleDownloadPdf() {
    const container = pdfSourceRef.current;
    if (!container || exportingPdf) return;

    const pages = Array.from(container.querySelectorAll<HTMLElement>('.q-page'));

    setExportingPdf(true);
    try {
      await exportPagesToPdf(
        pages,
        `Quotation_${data.quotationNo.replace(/\//g, '-') || 'draft'}.pdf`,
      );
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF export failed. Please try again.');
    } finally {
      setExportingPdf(false);
    }
  }

  return (
    <div className="qb-layout">
      <div className="qb-toolbar flex flex-wrap items-center gap-2 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">

        {/* New */}
        <button
          onClick={handleNewQuotation}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
        >
          <span className="text-lg leading-none">+</span>
          New
        </button>



        {/* Save Draft */}
        <button
          onClick={handleSaveDraft}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 active:scale-95 transition-all shadow-sm"
        >
          {savedMsg ? '✓ Saved' : '💾 Save Draft'}
        </button>

      

        {/* Excel */}
        <button
          onClick={() => exportQuotationToExcel(data, company)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 active:scale-95 transition-all shadow-sm"
        >
          📊 Download Excel
        </button>

        {/* PDF — generated from the hidden preview render (pixel-identical to Preview tab) */}
        <button
          onClick={handleDownloadPdf}
          disabled={exportingPdf}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 active:scale-95 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {exportingPdf ? '⏳ Preparing PDF…' : '📄 Download PDF'}
        </button>

      </div>

      {tab === 'edit' && <QuotationForm value={data} onChange={setData} isNew={isNew} />}
      {tab === 'preview' && <QuotationPreview data={data} company={company} />}
      {tab === 'drafts' && (
        <DraftsList onOpen={handleOpenDraft} onDuplicate={handleDuplicate} />
      )}

      {/* Always-mounted, off-screen copy of the quotation used ONLY as the
          PDF source. Must stay rendered (no display:none) or capture fails. */}
      <div ref={pdfSourceRef} className="pdf-offscreen" aria-hidden="true">
        <QuotationPreview data={data} company={company} />
      </div>
    </div>
  );
}

function DraftsList({
  onOpen, onDuplicate,
}: { onOpen: (id: string) => void; onDuplicate: (id: string) => void }) {
  const [drafts, setDrafts] = useState(listDrafts());

  function refresh() { setDrafts(listDrafts()); }
  function handleDelete(id: string) { deleteDraft(id); refresh(); }

  if (drafts.length === 0) return <p>No saved drafts on this device yet.</p>;

  return (
    <table className="qf-price-table">
      <thead>
        <tr><th>Quotation No</th><th>Customer</th><th>Date</th><th /></tr>
      </thead>
      <tbody>
        {drafts.map((d) => (
          <tr key={d.id}>
            <td>{d.quotationNo}</td>
            <td>{d.customerName || <em>(no name yet)</em>}</td>
            <td>{d.date}</td>
            <td>
              <button onClick={() => onOpen(d.id)}>Open</button>
              <button onClick={() => onDuplicate(d.id)}>Duplicate</button>
              <button onClick={() => handleDelete(d.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
