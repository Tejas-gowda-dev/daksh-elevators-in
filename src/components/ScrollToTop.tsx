import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* ============================================
   SCROLL TO TOP ON ROUTE CHANGE
   ============================================ */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [pathname]);

  return null;
}
