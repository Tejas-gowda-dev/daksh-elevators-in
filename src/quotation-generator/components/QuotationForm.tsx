import { useEffect } from 'react';
import type { QuotationData, SpecFieldKey, PriceLine } from '../types/quotation';
import { specOptions, specLabels } from '../data/specOptions';
import { getNextQuotationNumber, todayFormatted } from '../utils/quotationNumber';
import { priceLineDescriptions } from '../data/specOptions';

interface Props {
  value: QuotationData;
  onChange: (next: QuotationData) => void;
  isNew: boolean; // true only when creating a brand-new quotation (drives auto quotation-no/date)
}

// One field renders as <select> when specOptions has a list for that key,
// otherwise as free text. Add a key to specOptions.ts and it becomes a
// dropdown everywhere with zero changes here.
function SpecField({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: SpecFieldKey;
  value: string;
  onChange: (v: string) => void;
}) {
  const options = specOptions[fieldKey];
  return (
    <label className="flex flex-col gap-1.5 w-full">
      <span className="text-xs font-semibold tracking-wide uppercase text-slate-600">
        {specLabels[fieldKey]}
      </span>
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm outline-none transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        >
          {!options.includes(value) && value && <option value={value}>{value}</option>}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm outline-none transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      )}
    </label>
  );
}

export default function QuotationForm({ value, onChange, isNew }: Props) {
  // Auto-generate quotation number + today's date exactly once, for new quotations only.
  // Purely client-side (localStorage counter) — no request, no loading state needed.
  useEffect(() => {
    if (!isNew) return;
    if (value.quotationNo) return;
    onChange({ ...value, quotationNo: getNextQuotationNumber(), date: todayFormatted() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew]);

  const setSpec = (key: SpecFieldKey, v: string) =>
    onChange({ ...value, specs: { ...value.specs, [key]: v } });

  const setCustomer = (patch: Partial<QuotationData['customer']>) =>
    onChange({ ...value, customer: { ...value.customer, ...patch } });

  const addPriceLine = () => {
    const line: PriceLine = {
      id: crypto.randomUUID(),
      description: '',
      qty: 1,
      basicPrice: 0,
      gstPercent: 18,
    };
    onChange({ ...value, priceLines: [...value.priceLines, line] });
  };

  const updatePriceLine = (id: string, patch: Partial<PriceLine>) =>
    onChange({
      ...value,
      priceLines: value.priceLines.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    });

  const removePriceLine = (id: string) =>
    onChange({ ...value, priceLines: value.priceLines.filter((l) => l.id !== id) });

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen">
      {/* Quotation Header Details */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
          Quotation
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-600">
              Quotation No.
            </span>
            <input
              type="text"
              value={value.quotationNo}
              onChange={(e) => onChange({ ...value, quotationNo: e.target.value })}
              className="w-full px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 border border-slate-300 rounded-lg shadow-inner cursor-not-allowed outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-600">
              Date
            </span>
            <input
              type="text"
              value={value.date}
              onChange={(e) => onChange({ ...value, date: e.target.value })}
              className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm outline-none transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </label>
        </div>
      </section>

      {/* Customer Details */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
          Customer Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <label className="flex flex-col gap-1.5 sm:col-span-1">
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-600">
              Salutation
            </span>
            <select
              value={value.customer.salutation}
              onChange={(e) => setCustomer({ salutation: e.target.value as any })}
              className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm outline-none transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            >
              <option>Mr./Mrs.</option>
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>M/s.</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5 sm:col-span-3">
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-600">
              Customer Name
            </span>
            <input
              type="text"
              value={value.customer.customerName}
              onChange={(e) => setCustomer({ customerName: e.target.value })}
              placeholder="ASCENZE CONSTRUCTIONS (Dilip Shivraj Kumar)"
              className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm outline-none transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 placeholder:text-slate-400"
            />
          </label>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-600">
              Address
            </span>
            <textarea
              value={value.customer.address}
              onChange={(e) => setCustomer({ address: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm outline-none transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-600">
              Project Site Address (if different)
            </span>
            <textarea
              value={value.customer.projectSiteAddress || ''}
              onChange={(e) => setCustomer({ projectSiteAddress: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm outline-none transition duration-150 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </label>
        </div>
      </section>

      {/* Civil Dimensions */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
          Available Civil Dimensions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <SpecField fieldKey="hoistWayWidth" value={value.specs.hoistWayWidth} onChange={(v) => setSpec('hoistWayWidth', v)} />
          <SpecField fieldKey="hoistWayDepth" value={value.specs.hoistWayDepth} onChange={(v) => setSpec('hoistWayDepth', v)} />
          <SpecField fieldKey="pitDepth" value={value.specs.pitDepth} onChange={(v) => setSpec('pitDepth', v)} />
          <SpecField fieldKey="floorToFloorHeight" value={value.specs.floorToFloorHeight} onChange={(v) => setSpec('floorToFloorHeight', v)} />
          <SpecField fieldKey="overheadHeight" value={value.specs.overheadHeight} onChange={(v) => setSpec('overheadHeight', v)} />
        </div>
      </section>

      {/* Elevator Specification */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
          Elevator Specification
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {([
            'ratedLoad', 'numberOfStops', 'numberOfAccessSides', 'floorDesignations',
            'totalTravelHeight', 'controlSystem', 'operation', 'ratedSpeed', 'machineType',
            'powerSupply', 'carSizeWidth', 'carSizeDepth', 'carSizeHeight',
            'clearOpeningWidth', 'clearOpeningHeight',
          ] as SpecFieldKey[]).map((key) => (
            <SpecField key={key} fieldKey={key} value={value.specs[key]} onChange={(v) => setSpec(key, v)} />
          ))}
        </div>
      </section>

      {/* Commercial Proposal */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
          Commercial Proposal
        </h3>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3 min-w-[240px]"><strong>WE PROPOSE</strong>{" "}
                  <span style={{ fontWeight: "normal" }}>
                    to Supply, Install, Test and Commission of elevator outlined in the foregoing proposal
                  </span></th>

                <th className="px-4 py-3 w-28">Qty</th>
                <th className="px-4 py-3 w-36">Basic Price</th>
                <th className="px-4 py-3 w-28">GST %</th>
                <th className="px-4 py-3 w-36 text-right">Total</th>
                <th className="px-4 py-3 w-12 text-center" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {value.priceLines.map((line) => {
                const basicTotal = line.qty * line.basicPrice;
                const total = basicTotal + (basicTotal * line.gstPercent) / 100;
                return (
                  <tr key={line.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 align-top">
                      <select
                        value={line.description}
                        onChange={(e) =>
                          updatePriceLine(line.id, {
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-1.5 text-sm text-slate-800 bg-white border border-slate-300 rounded-md outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      >
                        {line.description &&
                          !priceLineDescriptions.includes(line.description) && (
                            <option value={line.description}>
                              {line.description}
                            </option>
                          )}

                        {priceLineDescriptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>


                    </td>
                    <td className="p-3 align-top">
                      <input
                        type="number"
                        min={""}
                        value={line.qty}
                        onChange={(e) => updatePriceLine(line.id, { qty: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 text-sm text-slate-800 bg-white border border-slate-300 rounded-md outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="p-3 align-top">
                      <input
                        type="number"
                        min={0}
                        value={line.basicPrice}
                        onChange={(e) => updatePriceLine(line.id, { basicPrice: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 text-sm text-slate-800 bg-white border border-slate-300 rounded-md outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="p-3 align-top">
                      <input
                        type="number"
                        min={0}
                        value={line.gstPercent}
                        onChange={(e) => updatePriceLine(line.id, { gstPercent: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 text-sm text-slate-800 bg-white border border-slate-300 rounded-md outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="p-3 align-middle text-right font-medium text-slate-900 tabular-nums">
                      {total.toFixed(2)}
                    </td>
                    <td className="p-3 align-middle text-center">
                      <button
                        type="button"
                        onClick={() => removePriceLine(line.id)}
                        aria-label="Remove line"
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          onClick={addPriceLine}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition duration-150 ease-in-out outline-none focus:ring-2 focus:ring-indigo-500"
        >
          + Add price line
        </button>
      </section>
    </div>
  );
}