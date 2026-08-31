import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Download } from "lucide-react";

import AnimatedSection from "../sections/AnimatedSection";
import About from "../../assets/dksha-about.webp";

const ABOUT_BULLET_POINTS = [
  "Established in 2018 with proven industry experience",
  "250+ successful projects completed across various sectors",
  "High safety standards and quality-driven processes",
  "Customized elevator solutions for every space",
  "Reliable after-sales service and maintenance support",
];

export default function AboutPreview() {
  return (
    <section className="py-14 bg-gray-50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Image */}
          <AnimatedSection>
            <div className="relative">
              <div className="w-full max-w-[712px] aspect-[712/534] rounded-lg overflow-hidden shadow-xl">
                <img
                  src={About}
                  alt="Best Elevator Company in Bangalore"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* About Content */}
          <AnimatedSection delay={0.2}>
            <span className="inline-block text-brand-orange text-xl font-bold uppercase tracking-wider mb-3">
              Why Choose Us?
            </span>

            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Established in <strong>2018</strong>, Dksh Elevator Solutions is a
              trusted provider of reliable, safe, and efficient elevator solutions.
              With <strong>250+ projects successfully completed</strong>, we specialize
              in the design, installation, and maintenance of lifts for residential
              and commercial spaces. Driven by quality, safety, and customer
              satisfaction, we deliver elevator solutions you can trust.
            </p>

            <ul className="space-y-2 mb-8">
              {ABOUT_BULLET_POINTS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-gray-600 text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-white bg-brand-blue rounded-md hover:bg-brand-blue-dark transition-all duration-300"
              >
                Read More <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/brochure.pdf"
                download="Dksh-Elevator-Solutions-Brochure.pdf"
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-white bg-brand-orange rounded-md hover:opacity-90 transition-all duration-300"
              >
                Download Brochure <Download className="w-4 h-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
