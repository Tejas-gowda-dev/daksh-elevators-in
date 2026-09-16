import AnimatedSection from "../sections/AnimatedSection";
import SectionHeading from "../sections/SectionHeading";
import { FAQS } from "../data";

const FAQ_PREVIEW_COUNT = 5;

export default function FAQSection() {
  const faqs = FAQS.slice(0, FAQ_PREVIEW_COUNT);

  return (
    <section className="py-14 bg-gray-50">
      <div className="container">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          subtitle="Get answers to the most common questions about our elevators and services."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  return (
    <AnimatedSection delay={index * 0.08}>
      <details className="bg-white rounded-lg border border-gray-100 shadow-sm group">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
          <span className="text-gray-800 font-medium text-sm md:text-base pr-4">
            {faq.q}
          </span>
          <span className="text-brand-blue text-xl group-open:rotate-45 transition-transform duration-300 shrink-0">
            +
          </span>
        </summary>
        <div className="px-6 pb-6 -mt-2">
          <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
        </div>
      </details>
    </AnimatedSection>
  );
}
