import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "../components/data";
import AnimatedSection from "../components/sections/AnimatedSection";
import SEO from "../components/SEO";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();

  const service = SERVICES.find((service) => service.slug === slug);

  if (!service) {
    return (
      <div className="container pt-32 pb-24 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Service Not Found
        </h1>

        <Link
          to="/services"
          className="font-semibold text-brand-blue hover:underline"
        >
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
         <SEO
                title={`${service.name} | Daksh Elevators`}
                description={service.fullDesc}
                keywords={`${service.name}, Daksh Elevators, ${service.slug}`}
              />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-brand-blue">
          <div className="absolute inset-0 bg-gradient-to-r from-[#005fa3] to-[#0077CC]" />
        </div>

        <div className="container relative z-10">
          <AnimatedSection>
            <Link
              to="/services"
              className="mb-6 inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
            >
              &larr; All Services
            </Link>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {service.name}
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-white/80">
              {service.fullDesc}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-20">
        <div className="container">
          <AnimatedSection>
            <h2 className="mb-8 text-2xl font-bold text-gray-900">
              Our Process
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {service.process.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 rounded-lg border border-gray-100 bg-gray-50 p-6 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue/10">
                    <span className="text-sm font-bold text-brand-blue">
                      {index + 1}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              Need {service.name} Service?
            </h2>

            <p className="mx-auto mb-8 max-w-xl text-lg text-gray-500">
              Contact our team for a free consultation and customized service
              proposal.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-brand-orange px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-brand-orange-dark"
            >
              Request Service
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}