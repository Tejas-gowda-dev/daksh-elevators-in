import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import AnimatedSection from "../sections/AnimatedSection";
import { COMPANY } from "../data";

export default function CTASection() {
  return (
    <section className="py-14 bg-brand-blue">
      <div className="container">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Elevate Your Project?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
              Schedule a free consultation with our expert team. We'll help you
              choose the perfect elevator solution for your building.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-brand-orange rounded-md hover:bg-brand-orange-dark transition-all duration-300"
              >
                Get Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white border-2 border-white/30 rounded-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Call {COMPANY.phone}
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
