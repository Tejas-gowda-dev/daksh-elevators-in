import AnimatedSection from "../sections/AnimatedSection";
import SectionHeading from "../sections/SectionHeading";
import { INDUSTRIES } from "../data";

export default function IndustriesSection() {
  return (
    <section className="py-14 bg-gray-50">
      <div className="container">
        <SectionHeading
          label="Industries Served"
          title="Trusted Across Sectors"
          subtitle="Our elevators power vertical movement in every sector that matters."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {INDUSTRIES.map((industry, i) => (
            <AnimatedSection key={industry.name} delay={i * 0.05}>
              <div className="bg-white rounded-lg p-5 text-center transition-all duration-500 shadow-md hover:shadow-lg border border-gray-100 hover:-translate-y-1">
                <p className="text-gray-700 text-sm font-semibold">
                  {industry.name}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
