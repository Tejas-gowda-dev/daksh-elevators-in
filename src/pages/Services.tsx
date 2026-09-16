import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICES, COMPANY } from "../components/data";
import AnimatedSection from "../components/sections/AnimatedSection";
import LogoDark from "../assets/dksha-elevator.webp";
import SEO from "../components/SEO";

export default function Services() {
  return (
    <div className="pt-20">
         <SEO
                title="Our Services | Daksh Elevators"
                description="Explore our comprehensive range of premium elevator solutions for residential, commercial, hospital, and industrial applications."
                keywords="Passenger Elevators, Home Elevators, Hospital Elevators, Goods Elevators, Capsule Lifts, Hydraulic Lifts, MRL Lifts"
              />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-brand-blue">
          <div className="absolute inset-0 bg-gradient-to-r from-[#005fa3] to-[#0077CC]" />
        </div>

        <div className="container relative z-10">
          <AnimatedSection>
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-wider text-brand-orange">
              Our Services
            </span>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Complete Elevator <br />
              Lifecycle Services
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-white/80">
              From initial installation to ongoing maintenance and
              modernization, we provide end-to-end elevator solutions that
              ensure your vertical transportation system operates at peak
              performance.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-20">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2">
            {SERVICES.map((service, index) => (
              <AnimatedSection
                key={service.slug}
                delay={index * 0.1}
              >
                <Link to={`/services/${service.slug}`}>
                  <div className="group h-full rounded-lg border border-gray-100 bg-white p-8 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                    <h3 className="mb-3 text-2xl font-bold text-gray-900">
                      {service.name}
                    </h3>

                    <p className="mb-6 text-base leading-relaxed text-gray-500">
                      {service.shortDesc}
                    </p>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {service.process
                        .slice(0, 3)
                        .map((step) => (
                          <span
                            key={step}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                          >
                            {step}
                          </span>
                        ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-blue">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-cover bg-center py-20 lg:py-28">
        <div className="absolute inset-0">
          <img
            src={LogoDark}
            alt="Elevator Company Bangalore"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0" />

        <div className="container relative z-10">
          <AnimatedSection>
            <div className="text-center">
              <p className="mb-10 whitespace-nowrap text-2xl text-white/80">
                Discover our expert services designed to simplify, enhance, and
                elevate your experience.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-brand-orange px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-brand-orange-dark"
                >
                  Get Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href={`tel:${COMPANY.phone}`}
                  className="inline-flex items-center gap-2 rounded-md border-2 border-white/30 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10"
                >
                  Call {COMPANY.phone}
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}