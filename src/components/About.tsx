import {
  Shield,
  Award,
  Building2,
  Target,
  Eye,
  Heart,
} from "lucide-react";

import SEO from "./SEO";
import AnimatedSection from "./sections/AnimatedSection";
import SectionHeading from "./sections/SectionHeading";

import founderImage from "../assets/ceo.webp";
import aboutImage from "../assets/aboutmain.webp";
import aboutsectionImage from "../assets/aboutsection.webp";

/* ============================================
   STATIC DATA
   ============================================ */
const MISSION_VISION_VALUES = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To manufacture and deliver the highest quality elevator systems that redefine vertical transportation, ensuring safety, efficiency, and reliability in every installation.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To be India's most trusted and innovative elevator company, setting benchmarks in engineering excellence and customer satisfaction.",
  },
  {
    icon: Heart,
    title: "Our Values",
    desc: "Safety first, customer-centric approach, innovation-driven solutions, uncompromising quality, and sustainable engineering practices.",
  },
] as const;

const CERTIFICATIONS = [
  "ISO 9001:2015",
  "BIS Certified",
  "IS 2091 Standard",
  "EN 81 Compliant",
] as const;

const FOUNDER_EXPERTISE = [
  {
    icon: Award,
    title: "20+ Years",
    description: "Industry Experience",
    iconBgClass: "bg-brand-orange/10",
    iconColorClass: "text-brand-orange",
  },
  {
    icon: Building2,
    title: "Expert",
    description: "Lift Installation & Maintenance",
    iconBgClass: "bg-brand-blue/10",
    iconColorClass: "text-brand-blue",
  },
] as const;

/* ============================================
   COMPONENT
   ============================================ */
export default function About() {
  return (
    <div className="pt-20">
      <SEO
        title="About Daksh Elevator | Home & Commercial Elevators Bangalore"
        description="Daksh Elevator Solutions provides premium elevators, installation, modernization, AMC, and maintenance services across India."
        keywords="Elevator Company Bangalore, Lift Company Bangalore, Home Elevators, Passenger Lift, Goods Lift, Hospital Lift, MRL Lift, Hydraulic Lift, Traction Lift, Glass Lift, Capsule Lift, Villa Lift, Lift Installation, Elevator Maintenance, Lift AMC, Elevator Modernization, Daksh Elevators"
      />

      {/* HERO */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aboutsectionImage}
            alt="Best home elevator company in Bangalore"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="container relative z-10">
          <AnimatedSection>
            <span className="inline-block text-brand-orange text-sm font-bold uppercase tracking-wider mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Elevator Manufacturer
            </h1>
            <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
              Daksh Elevator Solutions has been at the forefront of vertical
              transportation innovation, delivering reliable elevator systems
              that combine engineering excellence with quality design.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <img
                  src={aboutImage}
                  alt="Elevator maintenance services near me"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <span className="inline-block text-brand-orange text-sm font-bold uppercase tracking-wider mb-3">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                From Vision to Excellence
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Founded in 2018 in Coimbatore, Daksh Elevator Solutions began
                with a vision to bring world-class elevator technology to India.
                What started as a small manufacturing unit has grown into one of
                the country's most trusted elevator brands.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Today, we operate state-of-the-art manufacturing facilities
                equipped with the latest CNC machinery, automated assembly
                lines, and quality testing centers. Our team of 500+
                professionals ensures every elevator meets international safety
                standards.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                From residential villas to towering commercial complexes,
                hospitals to shopping malls — Daksh Elevators have become
                synonymous with reliability, quality, and performance across
                India.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* MISSION VISION VALUES */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <SectionHeading label="Our Foundation" title="Mission, Vision & Values" />

          <div className="grid md:grid-cols-3 gap-6">
            {MISSION_VISION_VALUES.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} delay={i * 0.15}>
                  <div className="bg-white rounded-lg p-8 h-full text-center shadow-md border border-gray-100">
                    <Icon className="w-10 h-10 text-brand-blue mx-auto mb-5" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-20 bg-white">
        <div className="container">
          <SectionHeading
            label="Certifications"
            title="Quality & Compliance"
            subtitle="Our elevators meet the highest standards of safety and quality."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, i) => (
              <AnimatedSection key={cert} delay={i * 0.1}>
                <div className="bg-gray-50 rounded-lg p-6 text-center shadow-sm border border-gray-100">
                  <Shield className="w-8 h-8 text-brand-orange mx-auto mb-3" />
                  <p className="text-gray-800 font-bold text-sm">{cert}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Founder Image */}
            <AnimatedSection>
              <div className="relative max-w-lg mx-auto lg:mx-0">
                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
                  <img
                    src={founderImage}
                    alt="Dinesha SV, Managing Director of Daksh Elevators"
                    className="w-full object-cover"
                  />
                </div>

                <div className="absolute bottom-6 left-6 bg-brand-blue text-white rounded-lg px-5 py-4 shadow-lg">
                  <p className="text-2xl font-bold">20+</p>
                  <p className="text-xs text-white/80 uppercase tracking-wider">
                    Years Experience
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Founder Content */}
            <AnimatedSection delay={0.2}>
              <span className="inline-block text-brand-orange text-sm font-bold uppercase tracking-wider mb-3">
                Our Founder
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Dinesha SV
              </h2>
              <p className="text-brand-blue font-semibold text-lg mb-6">
                Managing Director, Daksh Elevators
              </p>

              <div className="w-16 h-1 bg-brand-orange rounded-full mb-6" />

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                The Founder's Story
              </h3>

              <p className="text-gray-600 leading-relaxed mb-5">
                With more than 20 years of extensive experience in the elevator
                industry, Dinesha SV brings deep industry knowledge and proven
                expertise in lift maintenance and new installations.
              </p>

              <p className="text-gray-600 leading-relaxed mb-8">
                His experience across the elevator industry has shaped Daksh
                Elevators' commitment to reliable engineering, quality
                workmanship, safety, and customer satisfaction. His vision is to
                deliver dependable vertical transportation solutions that
                customers can trust for years to come.
              </p>

              {/* Expertise Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {FOUNDER_EXPERTISE.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm"
                    >
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-md ${item.iconBgClass} flex items-center justify-center`}
                      >
                        <Icon className={`w-5 h-5 ${item.iconColorClass}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">
                          {item.title}
                        </h4>
                        <p className="text-gray-500 text-xs mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
