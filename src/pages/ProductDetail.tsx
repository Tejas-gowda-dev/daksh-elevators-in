import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, Shield } from "lucide-react";

import SEO from "../components/SEO";
import AnimatedSection from "../components/sections/AnimatedSection";
import { PRODUCTS, COMPANY } from "../components/data";

/* ============================================
   STATIC DATA
   ============================================ */
const SAFETY_FEATURES = [
  "Emergency Brake",
  "Door Interlock",
  "Overload Sensor",
  "Fire Service",
  "Earthquake Mode",
  "Backup Power",
] as const;

// const SPEC_LABELS = ["Capacity", "Speed", "Stops"] as const;

/* ============================================
   COMPONENT
   ============================================ */
export default function ProductDetail() {
  // ✅ React Router DOM uses useParams() hook
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS.find((p) => p.slug === slug);

  // 404 STATE
  if (!product) {
    return (
      <>
        <SEO
          title="Product Not Found | Daksh Elevators"
          description="The product you are looking for does not exist."
        />
        <div className="pt-32 pb-24 container text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-brand-blue hover:underline font-semibold"
          >
            <ArrowRight className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </>
    );
  }

  // Build specs array dynamically from product
  const specs = [
    { label: "Capacity", value: product.capacity },
    { label: "Speed", value: product.speed },
    { label: "Stops", value: product.stops },
  ];

  return (
    <div className="pt-20">
      <SEO
        title={`${product.name} | Daksh Elevators`}
        description={product.fullDesc}
        keywords={`${product.name}, Daksh Elevators, ${product.slug}`}
      />

      {/* ============================================
          HERO
      ============================================ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-brand-blue">
          <div className="absolute inset-0 bg-gradient-to-r from-[#005fa3] to-[#0077CC]" />
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <Link
                to="/products"
                className="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white"
              >
                ← All Products
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {product.name}
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                {product.fullDesc}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-brand-orange rounded-md hover:bg-brand-orange-dark transition-all duration-300"
                >
                  Request Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white border-2 border-white/30 rounded-md hover:bg-white/10 transition-all duration-300"
                >
                  Talk to Expert
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================================
          SPECS + FEATURES + APPLICATIONS
      ============================================ */}
      <section className="py-20 bg-white">
        <div className="container">
          {/* Specs Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {specs.map((spec) => (
              <AnimatedSection key={spec.label}>
                <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-brand-blue text-xs font-bold uppercase tracking-wider mb-2">
                    {spec.label}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {spec.value}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Features + Applications */}
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-gray-600 text-sm"
                  >
                    <Check className="w-4 h-4 text-brand-orange shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Applications
              </h3>
              <div className="space-y-3">
                {product.applications.map((app) => (
                  <div
                    key={app}
                    className="bg-gray-50 rounded-lg px-5 py-4 flex items-center gap-3 border border-gray-100"
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-blue" />
                    <span className="text-gray-600 text-sm">{app}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ============================================
          SAFETY
      ============================================ */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <AnimatedSection>
            <div className="bg-white rounded-lg p-12 md:p-16 shadow-md border border-gray-100">
              <div className="flex items-start gap-6">
                <Shield className="w-12 h-12 text-brand-blue shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Safety Features
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    Every {product.name} is equipped with multi-layer safety
                    systems including emergency brakes, door interlock
                    mechanisms, overload sensors, emergency communication
                    systems, and backup power for safe evacuation during power
                    failures.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SAFETY_FEATURES.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-gray-600 text-sm"
                      >
                        <Check className="w-3.5 h-3.5 text-brand-orange" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================================
          CTA
      ============================================ */}
      <section className="py-20 bg-brand-blue">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Interested in {product.name}?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Get a customized quote for your project. Our team will analyze
              your requirements and provide the best solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-brand-orange rounded-md hover:bg-brand-orange-dark transition-all duration-300"
              >
                Request Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white border-2 border-white/30 rounded-md hover:bg-white/10 transition-all duration-300"
              >
                View All Products
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
