import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import SEO from "../SEO";
import LogoDark from "../../assets/dksha-elevator.webp";
import Main1 from "../../assets/DakshaMain1.webp";
import Main2 from "../../assets/DakshMain2.webp";
import Main3 from "../../assets/aboutsection.webp";

const HERO_BACKGROUND_IMAGES = [LogoDark, Main3, Main1, Main2];
const HERO_ROTATION_INTERVAL_MS = 4000;

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_BACKGROUND_IMAGES.length);
    }, HERO_ROTATION_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SEO
        title="Daksh Elevators Pvt. Ltd. | Home, Commercial & Passenger Elevators Bangalore"
        description="Daksh Elevator Solutions provides premium elevators, installation, modernization, AMC, and maintenance services across India."
        keywords="Elevator manufacturer, Passenger Lift, Home Lift, Goods Lift"
      />

      <section className="relative min-h-[85vh] flex items-center overflow-hidden ">
        {/* Background image carousel */}
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImage}
            src={HERO_BACKGROUND_IMAGES[currentImage]}
            alt="Daksh Elevators"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="container relative z-10 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 text-white/80 text-sm font-medium mb-4">
              Welcome To
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-4">
              Daksh Elevators
            </h1>

            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Daksh Elevators has grown to become one of the few fully integrated
              Indian elevator companies that designs, engineers, installs and
              maintains elevating devices.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-white bg-brand-orange rounded-md hover:bg-brand-orange-dark transition-all duration-300 hover:shadow-lg"
              >
                About Us <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-white border-2 border-white/30 rounded-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
