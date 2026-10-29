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
  /** Set true for private / thin pages that must NOT appear in Google. */
  noindex?: boolean;
}

const SITE_URL = "https://www.storiesbyfoot.com";
// 1200x630 JPG (public/og-default.jpg). Facebook / WhatsApp / X do not render SVG previews.
const DEFAULT_IMAGE = `${SITE_URL}/og-default.jpg`;

const INDEX_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  schema,
  noindex = false,
}) => {
  const location = useLocation();
  // Canonical = clean path only (no query string, no trailing slash) to avoid duplicate-URL indexing.
  const cleanPath = location.pathname.replace(/\/+$/, "");
  const canonicalUrl = url || `${SITE_URL}${cleanPath}`;
  const schemaKey = schema ? JSON.stringify(schema) : "";
  // WhatsApp/Facebook previews do not reliably support WebP → fall back to the 1200x630 JPG.
  const ogImg = !image || /format=webp/i.test(image) ? DEFAULT_IMAGE : image;

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

    // 2. Description, keywords, robots, canonical
    setMeta("description", description);
    if (keywords) {
      setMeta("keywords", keywords);
    }
    setMeta("robots", noindex ? "noindex, nofollow" : INDEX_ROBOTS);
    setCanonical(canonicalUrl);

    // 3. Open Graph (Facebook, WhatsApp, LinkedIn, Slack previews)
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", ogImg, true);
    setMeta("og:image:alt", title, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:type", type === "product" ? "website" : type, true);
    setMeta("og:site_name", "Stories by Foot", true);
    setMeta("og:locale", "en_IN", true);

    // 4. Twitter / X Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImg);

    // 5. JSON-LD structured data (replaces the prerendered one with the same id → no duplicates)
    let schemaScript = document.getElementById("jsonld-schema");
    if (schemaScript) {
      schemaScript.remove();
    }

    if (schema) {
      schemaScript = document.createElement("script");
      schemaScript.id = "jsonld-schema";
      schemaScript.setAttribute("type", "application/ld+json");
      schemaScript.textContent = JSON.stringify(schema);
      document.head.appendChild(schemaScript);
    }

    return () => {
      // Clean up injected schema script on page unmount to prevent duplicate scripts
      const oldScript = document.getElementById("jsonld-schema");
      if (oldScript) {
        oldScript.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, keywords, ogImg, canonicalUrl, type, schemaKey, noindex]);

  return null;
};

export default SEO;
