import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, COMPANY } from "./data";   // ✅ same folder
import Logo from "../assets/Daksh.webp";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // ✅ Correct: useLocation returns an OBJECT in react-router-dom
  const location = useLocation();
  const currentPath = location.pathname;   // ✅ path like "/about"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [currentPath]);   // ✅ use currentPath instead of location

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white border-b border-gray-100 shadow-sm" : "bg-white"
      }`}
    >
      <nav className="container max-w-[88rem] flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 group">
          <img src={Logo} alt="Daksh Elevators" className="h-20 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0">
          {NAV_LINKS.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => link.children && setOpenDropdown(link.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={link.href}
                className={`flex items-center gap-1 px-3 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-300 ${
                  currentPath === link.href
                    ? "text-[#0077CC]"
                    : "text-gray-700 hover:text-[#0077CC]"
                }`}
              >
                {link.label}
                {link.children && <ChevronDown className="w-3 h-3" />}
              </Link>

              <AnimatePresence>
                {link.children && openDropdown === link.href && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl p-3 shadow-xl border border-gray-100"
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="flex items-center justify-between px-3 py-2.5 text-sm text-gray-600 hover:text-[#0077CC] hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                      >
                        {child.label}
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#0077CC]" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${COMPANY.phone}`}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0077CC] transition-colors font-medium"
          >
            <Phone className="w-4 h-4 text-[#0077CC]" />
            {COMPANY.phone}
          </a>
          <Link
            to="/contact"
            className="px-6 py-2.5 text-sm font-bold text-white bg-[#FF6600] rounded-md hover:bg-[#e65c00] transition-all duration-300 hover:shadow-lg hover:shadow-orange-200 flex items-center gap-2"
          >
            Appointment <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-gray-700 p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="container py-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <div key={link.href} className="border-b border-gray-100 last:border-b-0">
                  {link.children ? (
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.href ? null : link.href)
                      }
                      className={`w-full flex items-center justify-between px-4 py-3 text-base font-semibold rounded-lg transition-colors ${
                        currentPath === link.href
                          ? "text-[#0077CC]"
                          : "text-gray-700 hover:text-[#0077CC]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          openDropdown === link.href ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className={`block px-4 py-3 text-base font-semibold rounded-lg transition-colors ${
                        currentPath === link.href
                          ? "text-[#0077CC]"
                          : "text-gray-700 hover:text-[#0077CC]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  <AnimatePresence>
                    {link.children && openDropdown === link.href && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-2 pl-4">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="flex items-center justify-between px-4 py-3 text-sm text-gray-500 hover:text-[#0077CC] hover:bg-blue-50 rounded-lg transition-all group"
                            >
                              <span>{child.label}</span>
                              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#0077CC]" />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="pt-4 mt-4">
                <Link
                  to="/contact"
                  className="block w-full text-center px-6 py-3 text-sm font-bold text-white bg-[#FF6600] rounded-md hover:bg-[#e65c00] transition-all duration-300"
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
