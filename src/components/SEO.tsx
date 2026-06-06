import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  schema?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = "https://www.storiesbyfoot.com/placeholder.svg",
  url,
  type = "website",
  schema,
}) => {
  const location = useLocation();
  const canonicalUrl = url || `https://www.storiesbyfoot.com${location.pathname}`;

  useEffect(() => {
    // 1. Update document Title
    document.title = title;

    // Helper to set/update meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute("content", content);
      } else {
        element = document.createElement("meta");
        element.setAttribute(isProperty ? "property" : "name", name);
        element.setAttribute("content", content);
        document.head.appendChild(element);
      }
    };

    // Helper to set/update canonical link
    const setCanonical = (href: string) => {
      let element = document.querySelector('link[rel="canonical"]');
      if (element) {
        element.setAttribute("href", href);
      } else {
        element = document.createElement("link");
        element.setAttribute("rel", "canonical");
        element.setAttribute("href", href);
        document.head.appendChild(element);
      }
    };

    // 2. Set description, keywords, and canonical
    setMeta("description", description);
    if (keywords) {
      setMeta("keywords", keywords);
    }
    setCanonical(canonicalUrl);

    // 3. Set Open Graph (Facebook, WhatsApp, Slack previews)
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", image, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:type", type, true);
    setMeta("og:site_name", "Stories by Foot", true);

    // 4. Set Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);

    // 5. Ingest JSON-LD schema markup for rich results
    let schemaScript = document.getElementById("jsonld-schema");
    if (schemaScript) {
      schemaScript.remove();
    }

    if (schema) {
      schemaScript = document.createElement("script");
      schemaScript.id = "jsonld-schema";
      schemaScript.setAttribute("type", "application/ld+json");
      schemaScript.innerHTML = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }

    return () => {
      // Clean up injected schema script on page unmount to prevent duplicate scripts
      const oldScript = document.getElementById("jsonld-schema");
      if (oldScript) {
        oldScript.remove();
      }
    };
  }, [title, description, keywords, image, canonicalUrl, type, schema]);

  return null;
};

export default SEO;
