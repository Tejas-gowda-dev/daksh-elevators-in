import type { QuotationData } from '../types/quotation';

// "No database" doesn't have to mean "no save button." Drafts live in the
// browser's localStorage, scoped to whichever staff machine is used. That's
// the right trade-off for an internal tool with no login: it's zero-infra,
// and a quotation that's actually done gets exported to PDF/Excel anyway —
// the file *is* the record from that point on, not this list.

const STORAGE_KEY = 'daksh-quotation-drafts';

interface DraftIndexEntry {
  id: string;
  quotationNo: string;
  customerName: string;
  date: string;
  updatedAt: string;
}

function readAll(): Record<string, QuotationData> {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

function writeAll(all: Record<string, QuotationData>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function saveDraft(data: QuotationData): QuotationData {
  const id = data.id || crypto.randomUUID();
  const saved: QuotationData = { ...data, id, status: 'draft', updatedAt: new Date().toISOString() };
  const all = readAll();
  all[id] = saved;
  writeAll(all);
  return saved;
}

export function listDrafts(): DraftIndexEntry[] {
  const all = readAll();
  return Object.values(all)
    .map((d) => ({
      id: d.id,
      quotationNo: d.quotationNo,
      customerName: d.customer.customerName,
      date: d.date,
      updatedAt: d.updatedAt,
    }))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function loadDraft(id: string): QuotationData | null {
  return readAll()[id] ?? null;
}

export function deleteDraft(id: string) {
  const all = readAll();
  delete all[id];
  writeAll(all);
}

// Duplicate: same as loadDraft but with a fresh id/quotationNo/status so it
// behaves as a brand-new quotation seeded from an old one — caller still
// needs to call getNextQuotationNumber() and assign it.
export function duplicateDraft(id: string): QuotationData | null {
  const original = loadDraft(id);
  if (!original) return null;
  const now = new Date().toISOString();
  return { ...original, id: '', quotationNo: '', status: 'draft', createdAt: now, updatedAt: now };
}
