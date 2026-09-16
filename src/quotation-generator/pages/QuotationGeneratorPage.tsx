import { useEffect } from 'react';
import QuotationBuilder from '../components/QuotationBuilder';

// Mount THIS component at your hidden route, e.g.:
//   <Route path="/quotation-generator-x7k2" element={<QuotationGeneratorPage />} />
// (React Router) or the equivalent for your framework. Notes below on why
// each piece here matters, since "hidden" has a few independent layers.
export default function QuotationGeneratorPage() {
  useEffect(() => {
    // Belt-and-braces: even though robots.txt (see below) already tells
    // crawlers to skip this path, a <meta name="robots"> tag on the page
    // itself protects you if the page is ever linked from somewhere you
    // don't control (robots.txt only stops WELL-BEHAVED crawlers).
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow, noarchive';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <QuotationBuilder />
    </div>
  );
}
