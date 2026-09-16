import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

/**
 * Renders each given element (one per quotation page) to a canvas and
 * places it on its own A4 page in the PDF — so the PDF is pixel-identical
 * to the on-screen preview.
 */
export async function exportPagesToPdf(
  pages: HTMLElement[],
  fileName: string,
): Promise<void> {
  if (pages.length === 0) throw new Error('No pages found to export');

  // Ensure webfonts are loaded before rasterizing
  try { await document.fonts.ready; } catch { /* not critical */ }

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
  const pageW = pdf.internal.pageSize.getWidth();  // 210mm
  const pageH = pdf.internal.pageSize.getHeight(); // 297mm

  for (let i = 0; i < pages.length; i++) {
    const canvas = await html2canvas(pages[i], {
      scale: 2,              // 2 = crisp; 3 = sharper but heavier
      useCORS: true,         // needed if the logo ever comes from another origin
      backgroundColor: '#ffffff',
      logging: false,
    });

    // Fit the canvas into A4 proportionally (no distortion)
    const ratio = Math.min(pageW / canvas.width, pageH / canvas.height);
    const w = canvas.width * ratio;
    const h = canvas.height * ratio;

    if (i > 0) pdf.addPage();
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.95),
      'JPEG',
      (pageW - w) / 2,
      (pageH - h) / 2,
      w,
      h,
      undefined,
      'FAST',
    );
  }

  pdf.save(fileName);
}
