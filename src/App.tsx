import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./components/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/products" element={<Layout><Products /></Layout>} />
      <Route path="/products/:slug" element={<Layout><ProductDetail /></Layout>} />
      <Route path="/services" element={<Layout><Services /></Layout>} />
      <Route path="/services/:slug" element={<Layout><ServiceDetail /></Layout>} />
      {/* <Route path="/gallery" element={<Layout><Gallery /></Layout>} /> */}
      {/* <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} /> */}
      {/* <Route path="/terms" element={<Layout><Terms /></Layout>} /> */}
      {/* <Route path="*" element={<Layout><NotFound /></Layout>} /> */}
    </Routes>
  );
}

export default App;
