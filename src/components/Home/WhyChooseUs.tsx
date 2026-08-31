import { Shield, Award, Clock, MapPin, Users, Building2 } from "lucide-react";

import AnimatedSection from "../sections/AnimatedSection";
import SectionHeading from "../sections/SectionHeading";

const WHY_CHOOSE_US_REASONS = [
  { icon: Shield, title: "Safety First", desc: "BIS certified elevators with multi-layer safety systems" },
  { icon: Award, title: "Premium Quality", desc: "Manufactured to international standards with premium materials" },
  { icon: Clock, title: "On-Time Delivery", desc: "99% of projects delivered within committed timelines" },
  { icon: MapPin, title: "Across Karnataka Service", desc: "Serving 150+ cities with dedicated service teams" },
  { icon: Users, title: "Expert Team", desc: "20+ certified engineers and technicians" },
  { icon: Building2, title: "Custom Solutions", desc: "Tailored designs for every project requirement" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-14 bg-white">
      <div className="container">
        <SectionHeading
          label="Why Choose Us"
          title="Daksh Elevator Advantage"
          subtitle="What sets us apart in India's elevator industry — and why leading developers trust us."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US_REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <AnimatedSection key={reason.title} delay={i * 0.1}>
                <div className="bg-white rounded-lg p-8 transition-all duration-500 group shadow-md hover:shadow-xl border border-gray-100 hover:-translate-y-1">
                  <Icon className="w-8 h-8 text-brand-orange mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
