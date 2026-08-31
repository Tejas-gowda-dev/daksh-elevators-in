import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import AnimatedSection from "../sections/AnimatedSection";
import SectionHeading from "../sections/SectionHeading";
import { SERVICES } from "../data";

export default function ServicesSection() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container">
        <SectionHeading
          label="Our Services"
          title="Complete Elevator Lifecycle"
          subtitle="From installation to modernization, we provide end-to-end elevator solutions with unmatched expertise."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <AnimatedSection key={service.slug} delay={i * 0.1}>
              <Link to={`/services/${service.slug}`}>
                <div className="group bg-white rounded-lg p-8 h-full transition-all duration-500 text-center shadow-md hover:shadow-xl border border-gray-100 hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-blue/20 transition-colors">
                    <ArrowRight className="w-6 h-6 text-brand-blue group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
