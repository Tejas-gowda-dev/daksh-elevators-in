import { useState, useEffect, type FormEvent} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X } from "lucide-react";

/* ============================================
   TYPES
   ============================================ */
interface PopupFormData {
  name: string;
  phone: string;
  liftType: string;
  buildingType: string;
  floors: string;
  message: string;
}

interface PopupFormErrors {
  name?: string;
  phone?: string;
}

interface FieldBaseProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  compact?: boolean;
}

interface FormFieldProps extends FieldBaseProps {
  type: string;
  min?: string;
  required?: boolean;
}

interface SelectFieldProps extends FieldBaseProps {
  options: readonly string[];
}

/* ============================================
   CONSTANTS
   ============================================ */
const INITIAL_FORM_DATA: PopupFormData = {
  name: "",
  phone: "",
  liftType: "",
  buildingType: "",
  floors: "",
  message: "",
};

const PHONE_REGEX = /^[0-9+\-\s()]{7,15}$/;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqpzgarz";
const FORMSPREE_SUBJECT = "New Website Enquiry - Daksh Elevators";

const LIFT_TYPE_OPTIONS = [
  "Passenger",
  "Home",
  "Capsule",
  "Hospital",
  "Goods",
  "Hydraulic",
  "MRL",
  "Freight",
] as const;

const BUILDING_TYPE_OPTIONS = [
  "Residential",
  "Commercial",
  "Hospital",
  "Hotel",
  "Industrial",
] as const;

// const POPUP_DELAY_MS = 2000;
const SUCCESS_AUTO_CLOSE_MS = 2500;
const POPUP_DISMISS_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

/* ============================================
   REUSABLE FIELDS (defined inside this file)
   ============================================ */
function FormField({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  min,
  required = false,
  compact = false,
}: FormFieldProps) {
  const sizeClasses = compact
    ? "px-3 py-2.5 text-xs sm:px-4 sm:py-3 sm:text-sm"
    : "px-4 py-3 text-sm";

  const labelClasses = compact
    ? "text-xs sm:text-sm mb-1.5 sm:mb-2"
    : "text-sm mb-2";

  return (
    <div>
      <label className={`block text-gray-600 font-medium ${labelClasses}`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors ${sizeClasses}`}
        placeholder={placeholder}
        min={min}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  compact = false,
}: SelectFieldProps) {
  const sizeClasses = compact
    ? "px-3 py-2.5 text-xs sm:px-4 sm:py-3 sm:text-sm"
    : "px-4 py-3 text-sm";

  const labelClasses = compact
    ? "text-xs sm:text-sm mb-1.5 sm:mb-2"
    : "text-sm mb-2";

  return (
    <div>
      <label className={`block text-gray-600 font-medium ${labelClasses}`}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors ${sizeClasses}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

/* ============================================
   MAIN COMPONENT
   ============================================ */
export default function AutoPopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<PopupFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<PopupFormErrors>({});

  /* ----------------------------------------
     AUTO POPUP LOGIC
  ---------------------------------------- */
  useEffect(() => {
    // Check if user dismissed the popup in the last 24 hours
    const dismissedAt = localStorage.getItem("popupDismissed");
    if (dismissedAt) {
      const elapsed = Date.now() - Number(dismissedAt);
      if (elapsed < POPUP_DISMISS_DURATION_MS) return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  /* ----------------------------------------
     LOCK BODY SCROLL
  ---------------------------------------- */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ----------------------------------------
     CLOSE HANDLERS
  ---------------------------------------- */
  const handleClose = () => setIsOpen(false);

  const handleDontShowAgain = () => {
    setIsOpen(false);
    localStorage.setItem("popupDismissed", Date.now().toString());
  };

  /* ----------------------------------------
     FORM FIELD UPDATE
  ---------------------------------------- */
  const updateField = <K extends keyof PopupFormData>(
    field: K,
    value: PopupFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field as keyof PopupFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  /* ----------------------------------------
     VALIDATION
  ---------------------------------------- */
  const validate = (): boolean => {
    const newErrors: PopupFormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!PHONE_REGEX.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ----------------------------------------
     FORM SUBMIT
  ---------------------------------------- */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          _subject: FORMSPREE_SUBJECT,
          _source: "Auto Popup Form",
        }),
      });

      if (res.ok) {
        setSubmitted(true);

        // Auto-close after success message
        setTimeout(() => {
          setIsOpen(false);
          setSubmitted(false);
          setForm(INITIAL_FORM_DATA);
        }, SUCCESS_AUTO_CLOSE_MS);
      } else {
        const data = await res.json();
        console.error("Formspree error:", data);
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close popup"
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessMessage key="success" />
              ) : (
                <PopupForm
                  key="form"
                  form={form}
                  errors={errors}
                  sending={sending}
                  onSubmit={handleSubmit}
                  onChange={updateField}
                  onDontShowAgain={handleDontShowAgain}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================
   SUB-COMPONENTS (defined inside this file)
   ============================================ */
function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 sm:p-8 md:p-12 text-center"
    >
      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-green-100 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You! 🎉</h3>
      <p className="text-gray-600">
        Your enquiry has been submitted. We'll get back to you shortly.
      </p>
    </motion.div>
  );
}

interface PopupFormProps {
  form: PopupFormData;
  errors: PopupFormErrors;
  sending: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: <K extends keyof PopupFormData>(
    field: K,
    value: PopupFormData[K]
  ) => void;
  onDontShowAgain: () => void;
}

function PopupForm({
  form,
  errors,
  sending,
  onSubmit,
  onChange,
  onDontShowAgain,
}: PopupFormProps) {
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={onSubmit}
      className="bg-white rounded-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6 relative overflow-hidden"
    >
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-brand-blue to-brand-orange" />

      {/* Header */}
      <div>
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1">
          Tell us about your project
        </h3>
      </div>

      {/* Name + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-5 md:gap-6">
        <FormField
          label="Name"
          type="text"
          value={form.name}
          error={errors.name}
          onChange={(v) => onChange("name", v)}
          placeholder="Your name"
          required
          compact
        />

        <FormField
          label="Phone"
          type="tel"
          value={form.phone}
          error={errors.phone}
          onChange={(v) => onChange("phone", v)}
          placeholder="Phone number"
          required
          compact
        />
      </div>

      {/* Project Details */}
      <div className="pt-2 border-t border-gray-100">
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-2 pt-2">
          Project details
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6">
          <SelectField
            label="Lift Type"
            value={form.liftType}
            onChange={(v) => onChange("liftType", v)}
            options={LIFT_TYPE_OPTIONS}
            placeholder="Select type"
            compact
          />

          <SelectField
            label="Building Type"
            value={form.buildingType}
            onChange={(v) => onChange("buildingType", v)}
            options={BUILDING_TYPE_OPTIONS}
            placeholder="Select type"
            compact
          />

          <div className="sm:col-span-2 md:col-span-1">
            <FormField
              label="Floors"
              type="number"
              value={form.floors}
              onChange={(v) => onChange("floors", v)}
              placeholder="No. of floors"
              min="1"
              compact
            />
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          value={form.message}
          onChange={(e) => onChange("message", e.target.value)}
          rows={4}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 sm:px-4 sm:py-3 text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors resize-none"
          placeholder="Tell us about your requirements"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={sending}
        className="w-full flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 md:py-4 text-xs sm:text-sm font-bold text-white bg-brand-orange rounded-lg hover:bg-brand-orange-dark transition-all duration-300 hover:shadow-lg hover:shadow-brand-orange/20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
        {sending ? "Sending..." : "Submit Enquiry"}
      </button>

      {/* Don't Show Again */}
      <button
        type="button"
        onClick={onDontShowAgain}
        className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        Don't show this again
      </button>
    </motion.form>
  );
}
