import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import SEO from "../components/SEO";
import AnimatedSection from "../components/sections/AnimatedSection";
import { PRODUCTS } from "../components/data";

/* ============================================
   COMPONENT
   ============================================ */
export default function Products() {
  return (
    <div className="pt-20">
      <SEO
        title="Our Products | Daksh Elevators"
        description="Explore our comprehensive range of premium elevator solutions for residential, commercial, hospital, and industrial applications."
        keywords="Passenger Elevators, Home Elevators, Hospital Elevators, Goods Elevators, Capsule Lifts, Hydraulic Lifts, MRL Lifts"
      />

      {/* ============================================
          HERO
      ============================================ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-brand-blue">
          <div className="absolute inset-0 bg-gradient-to-r from-[#005fa3] to-[#0077CC]" />
        </div>

        <div className="container relative z-10">
          <AnimatedSection>
            <span className="inline-block text-brand-orange text-sm font-bold uppercase tracking-wider mb-4">
              Our Products
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Elevator Range
            </h1>
            <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
              A comprehensive portfolio of elevator solutions engineered for
              every building type, capacity requirement, and aesthetic
              preference.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ============================================
          PRODUCT GRID
      ============================================ */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product, i) => (
              <AnimatedSection key={product.slug} delay={i * 0.08}>
                <Link to={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-500 hover:-translate-y-1 h-full">
                    <div className="aspect-[3/2] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        {product.shortDesc}
                      </p>
                      <span className="inline-flex items-center gap-1 text-brand-blue text-xs font-bold">
                        Learn More{" "}
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
