import { Link } from "react-router-dom";   // ✅ Changed from wouter
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { COMPANY } from "./data";      // Keep your alias
import Logo from "../assets/Daksh.webp";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a]">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={Logo} alt="Daksh Home Elevator Installation" className="h-20 max-w-[88rem]" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India's trusted elevator manufacturer delivering reliable vertical transportation solutions. Engineering excellence in every lift.
            </p>
            <div className="flex gap-3">
              {[
                { name: "Facebook", href: "#" },
                { name: "Instagram", href: "#" },
                { name: "LinkedIn", href: "#" },
                { name: "YouTube", href: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 rounded-md bg-white/5 flex items-center justify-center text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 transition-all duration-300"
                  aria-label={social.name}
                >
                  <span className="text-xs font-bold uppercase">{social.name[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-brand-blue uppercase tracking-wider mb-6">Products</h4>
            <ul className="space-y-3">
              {[
                { label: "Passenger Elevators", href: "/products/passenger-elevators" },
                { label: "Villa/Home Elevators", href: "/products/home-elevators" },
                { label: "Hospital Elevators", href: "/products/hospital-elevators" },
                { label: "Goods Elevators", href: "/products/goods-elevators" },
                { label: "Hydraulic Elevators", href: "/products/hydraulic-elevators" },
              ].map((item) => (
                <li key={item.href}>
                  {/* ✅ Changed: href={} → to={} for react-router-dom */}
                  <Link to={item.href} className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-orange" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-brand-blue uppercase tracking-wider mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { label: "Installation", href: "/services/installation" },
                { label: "Maintenance", href: "/services/maintenance" },
                { label: "AMC", href: "/services/amc" },
                { label: "Modernization", href: "/services/modernization" },
                { label: "Experience Center", href: "/gallery" },
              ].map((item) => (
                <li key={item.href}>
                  {/* ✅ Changed: href={} → to={} for react-router-dom */}
                  <Link to={item.href} className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-orange" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-brand-blue uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">{COMPANY.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <a href={`tel:${COMPANY.phone}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              {/* ✅ Changed: href={} → to={} for react-router-dom */}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-brand-orange rounded-md hover:bg-brand-orange-dark transition-all duration-300"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* ✅ Changed: href={} → to={} for react-router-dom */}
            <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
