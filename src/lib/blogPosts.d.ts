export interface NewBlogCtx { destinations: any[]; year: number }
export interface NewBlogPost {
  slug: string; date?: string; img: string; tags: string[]; authors: number[]; cardTitle: string; excerpt: string;
  title: (c: NewBlogCtx) => string;
  seo: (c: NewBlogCtx) => { title: string; description: string; keywords: string };
  content: (c: NewBlogCtx) => string;
}
export const newBlogPosts: NewBlogPost[];
export function getNewBlogPost(slug: string): NewBlogPost | undefined;
export function buildNewBlogSeo(ctx: NewBlogCtx): Record<string, { title: string; description: string; keywords: string; body: string; img?: string; date?: string }>;
