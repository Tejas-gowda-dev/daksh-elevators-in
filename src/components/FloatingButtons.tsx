import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

import { COMPANY } from "./data";

/* ============================================
   CONSTANTS
   ============================================ */
const WHATSAPP_PREFILL_MESSAGE =
  "Hello Daksh Elevators, I would like to know more about your elevator services.";

const WHATSAPP_GREEN = "#1ce365";

const BUTTON_ANIMATION = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20,
};

const BUTTON_SIZES = "w-14 h-14";

/* ============================================
   COMPONENT
   ============================================ */
export default function FloatingButtons() {
  // Extract digits only from phone number (e.g., "+91 98765 43210" → "919876543210")
  const whatsappNumber = COMPANY.whatsapp.replace(/\D/g, "");

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    WHATSAPP_PREFILL_MESSAGE
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, ...BUTTON_ANIMATION }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`${BUTTON_SIZES} rounded-full bg-[${WHATSAPP_GREEN}] flex items-center justify-center shadow-lg shadow-[${WHATSAPP_GREEN}]/30 hover:shadow-xl hover:shadow-[${WHATSAPP_GREEN}]/40 transition-shadow`}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.a>

      {/* Call Button */}
      <motion.a
        href={`tel:${COMPANY.phone}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, ...BUTTON_ANIMATION }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`${BUTTON_SIZES} rounded-full bg-brand-blue flex items-center justify-center shadow-lg shadow-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/40 transition-shadow`}
        aria-label="Call us"
      >
        <Phone className="w-6 h-6 text-white" />
      </motion.a>
    </div>
  );
}
