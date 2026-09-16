import type { PriceLine, CalculatedTotals } from '../types/quotation';

export function lineBasicTotal(line: PriceLine): number {
  return line.qty * line.basicPrice;
}

export function lineGstAmount(line: PriceLine): number {
  return (lineBasicTotal(line) * line.gstPercent) / 100;
}

export function lineGrandTotal(line: PriceLine): number {
  return lineBasicTotal(line) + lineGstAmount(line);
}

export function calculateTotals(lines: PriceLine[]): CalculatedTotals {
  const basicTotal = lines.reduce((sum, l) => sum + lineBasicTotal(l), 0);
  const gstTotal = lines.reduce((sum, l) => sum + lineGstAmount(l), 0);
  const grandTotal = basicTotal + gstTotal;
  return {
    basicTotal,
    gstTotal,
    grandTotal,
    grandTotalInWords: rupeesInWords(Math.round(grandTotal)),
  };
}

export function formatINR(amount: number): string {
  return amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Standard Indian numbering (Lakh/Crore) number-to-words for "Rupees In Word:"
const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function twoDigits(n: number): string {
  if (n < 20) return ONES[n];
  return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '');
}

function threeDigits(n: number): string {
  const hundred = Math.floor(n / 100);
  const rest = n % 100;
  return (hundred ? ONES[hundred] + ' Hundred' + (rest ? ' ' : '') : '') + (rest ? twoDigits(rest) : '');
}

export function rupeesInWords(amount: number): string {
  if (amount === 0) return 'Rupees Zero Only';
  let n = Math.floor(amount);
  const crore = Math.floor(n / 10000000); n %= 10000000;
  const lakh = Math.floor(n / 100000); n %= 100000;
  const thousand = Math.floor(n / 1000); n %= 1000;
  const hundred = n;

  const parts: string[] = [];
  if (crore) parts.push(threeDigits(crore) + ' Crore');
  if (lakh) parts.push(threeDigits(lakh) + ' Lakh');
  if (thousand) parts.push(threeDigits(thousand) + ' Thousand');
  if (hundred) parts.push(threeDigits(hundred));

  return `Rupees ${parts.join(' ')} Only /-`;
}
