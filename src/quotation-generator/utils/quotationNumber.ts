// No backend = no atomic DB counter. For an internal, single-form tool used
// by a small staff team, a localStorage-based counter is the right amount
// of complexity: it survives refreshes, needs zero infrastructure, and the
// realistic collision case (two staff typing a quotation at the exact same
// second on different machines) is rare enough to handle by convention
// (see the manual-override note below) rather than by building a server.

const STORAGE_KEY = 'daksh-quotation-counter';
const START_SEQ = 1010; // matches the sample doc's last number, DEPL/SA/1010

export function getNextQuotationNumber(prefix = 'DEPL/SA'): string {
  const raw = localStorage.getItem(STORAGE_KEY);
  const counters: Record<string, number> = raw ? JSON.parse(raw) : {};
  const next = (counters[prefix] ?? START_SEQ) + 1;
  counters[prefix] = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
  return `${prefix}/${next}`;
}

// If staff ever need to hand-correct the sequence (e.g. after a number was
// used outside the tool), expose a simple override:
export function setQuotationCounter(prefix: string, seq: number) {
  const raw = localStorage.getItem(STORAGE_KEY);
  const counters: Record<string, number> = raw ? JSON.parse(raw) : {};
  counters[prefix] = seq;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
}

export function todayFormatted(): string {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`; // matches "21/07/2026" style in the template
}
