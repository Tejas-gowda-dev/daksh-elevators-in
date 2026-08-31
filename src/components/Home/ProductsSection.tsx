import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import AnimatedSection from "../sections/AnimatedSection";
import SectionHeading from "../sections/SectionHeading";
import { PRODUCTS } from "../data";

const FEATURED_PRODUCTS_COUNT = 4;

export default function ProductsSection() {
  const featured = PRODUCTS.slice(0, FEATURED_PRODUCTS_COUNT);

  return (
    <section className="py-14 bg-white">
      <div className="container">
        <SectionHeading
          label="Our Products"
          title="Premium Elevator Solutions"
          subtitle="From residential elegance to industrial strength, discover elevators engineered for every vertical challenge."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <AnimatedSection key={product.slug} delay={i * 0.1}>
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
                      View Details{" "}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-brand-blue rounded-md hover:bg-brand-blue-dark transition-all duration-300"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
