import * as XLSX from 'xlsx';
import type { QuotationData, CompanySettings } from '../types/quotation';
import { specLabels } from '../data/specOptions';
import { calculateTotals } from './calc';

export function exportQuotationToExcel(data: QuotationData, company: CompanySettings) {
  const wb = XLSX.utils.book_new();

  // Sheet 1 — summary + customer
  const totals = calculateTotals(data.priceLines);
  const summaryRows = [
    ['Company', company.name],
    ['Quotation No', data.quotationNo],
    ['Date', data.date],
    [],
    ['Customer', `${data.customer.salutation} ${data.customer.customerName}`],
    ['Address', data.customer.address],
    ['Project Site', data.customer.projectSiteAddress || ''],
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryRows);
  XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');

  // Sheet 2 — pricing
  const priceRows = [
    ['Description', 'Qty', 'Basic Price', 'GST %', 'GST Amount', 'Total'],
    ...data.priceLines.map((l) => {
      const basic = l.qty * l.basicPrice;
      const gst = (basic * l.gstPercent) / 100;
      return [l.description, l.qty, l.basicPrice, l.gstPercent, gst, basic + gst];
    }),
    [],
    ['', '', '', '', 'Grand Total', totals.grandTotal],
    ['', '', '', '', 'In Words', totals.grandTotalInWords],
  ];
  const priceSheet = XLSX.utils.aoa_to_sheet(priceRows);
  XLSX.utils.book_append_sheet(wb, priceSheet, 'Pricing');

  // Sheet 3 — technical specification
  const specRows = [
    ['Field', 'Value'],
    ...Object.entries(specLabels).map(([key, label]) => [label, (data.specs as any)[key]]),
  ];
  const specSheet = XLSX.utils.aoa_to_sheet(specRows);
  XLSX.utils.book_append_sheet(wb, specSheet, 'Specifications');

  const filename = `Quotation_${data.quotationNo.replace(/\//g, '-')}.xlsx`;
  XLSX.writeFile(wb, filename);
}
