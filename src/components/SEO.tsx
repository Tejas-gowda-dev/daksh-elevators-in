import { useEffect } from "react";

interface Props {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

const BASE_URL = "https://dakshelevators.in";

export default function SEO({ title, description, keywords = "elevator, lift, Daksh Elevators", canonical = "", ogImage = "" }: Props) {
  useEffect(() => {
    document.title = title;

    const updateMeta = (name: string, attr: "name" | "property", content: string) => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    updateMeta("description", "name", description);
    updateMeta("keywords", "name", keywords);
    updateMeta("og:title", "property", title);
    updateMeta("og:description", "property", description);
    updateMeta("og:type", "property", "website");
    updateMeta("og:url", "property", canonical || BASE_URL);
    if (ogImage) updateMeta("og:image", "property", ogImage);
    updateMeta("twitter:card", "name", "summary_large_image");
    updateMeta("twitter:title", "name", title);
    updateMeta("twitter:description", "name", description);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical || BASE_URL;

    // Update JSON-LD
    let jsonLd = document.getElementById("json-ld") as HTMLScriptElement;
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.id = "json-ld";
      jsonLd.type = "application/ld+json";
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Daksh Elevator Solutions",
      url: BASE_URL,
      description: "India's premier elevator manufacturer delivering luxury vertical transportation solutions.",
      telephone: "+91 98765 43210",
      email: "Info@dakshelevators.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Industrial Estate",
        addressLocality: "Coimbatore",
        addressRegion: "Tamil Nadu",
        postalCode: "641001",
        addressCountry: "IN",
      },
      foundingDate: "2005",
    });
  }, [title, description, keywords, canonical, ogImage]);

  return null;
}
