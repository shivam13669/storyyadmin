import type { Destination, DestinationPackage } from "@/data/destinations";

export interface SEOResult {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
  schema: Record<string, any>;
  type?: "website" | "article" | "product";
}

export const SITE_URL: string;
export const SITE_NAME: string;
export const DEFAULT_IMAGE: string;
export const LOGO_URL: string;
export const ORG: Record<string, any>;
export const SEASON_YEAR_OVERRIDE: number | null;
export function seasonYear(): number;
export function priceNumber(price: string): number;
export function parseDuration(duration?: string): { days: number; nights: number };
export function trimTo(text: string, max: number): string;
export function packageKind(pkg: DestinationPackage): { label: string; isBike: boolean };
export function inclusionHighlights(pkg: DestinationPackage): string[];
export function packageUrl(dest: Destination, pkg: DestinationPackage): string;
export function destinationUrl(dest: Destination): string;
export function breadcrumbSchema(items: { name: string; url: string }[], id?: string): Record<string, any>;
export function buildHomeSEO(destinations: Destination[]): SEOResult;
export function buildListingSEO(destinations: Destination[]): SEOResult;
export function buildDestinationSEO(dest: Destination): SEOResult;
export function buildPackageSEO(dest: Destination, pkg: DestinationPackage): SEOResult;
export function fitTitle(title: string, max?: number): string;
export function ogImage(url?: string): string;
export function buildArticleSchema(a: { slug: string; title: string; description: string; image?: string; date?: string }): Record<string, any>;
