import { Star } from "lucide-react";

import AnimatedSection from "../sections/AnimatedSection";
import SectionHeading from "../sections/SectionHeading";
import { TESTIMONIALS } from "../data";

export default function TestimonialsSection() {
  return (
    <section className="py-14 bg-white">
      <div className="container">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          subtitle="Don't just take our word for it — hear from the developers, architects, and homeowners who trust us."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-white rounded-lg p-8 transition-all duration-500 h-full shadow-md hover:shadow-lg border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                  ))}
                </div>
                <p className="text-gray-600 text-base leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">
                    {t.name}
                  </div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
