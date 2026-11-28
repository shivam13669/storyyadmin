import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { newBlogPosts } from "@/lib/blogPosts";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Compass,
  Search,
} from "lucide-react";

type CategoryTone = "green" | "pink" | "purple" | "yellow";

interface BlogArticleItem {
  slug: string;
  category: string;
  categoryTone: CategoryTone;
  tags: string[];
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

const categoryToneClasses: Record<CategoryTone, string> = {
  green: "bg-[#e6f5ee] text-[#0d8048]",
  pink: "bg-[#fff0f5] text-[#bd245a]",
  purple: "bg-[#f4eaff] text-[#5d1498]",
  yellow: "bg-[#fff7dc] text-[#9a6b00]",
};

const TONES: CategoryTone[] = ["green", "purple", "yellow", "pink"];

const getSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const CLASSIC_POSTS: BlogArticleItem[] = [
  {
    slug: getSlug("Leh Ladakh Bike Trip Guide"),
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&h=560&q=80",
    category: "Ladakh Guide",
    categoryTone: "green",
    tags: ["Adventure", "Ladakh", "Bike Trip"],
    title: "Leh Ladakh Bike Trip Guide",
    description:
      "Your ultimate guide to a Leh Ladakh bike trip in 2026. Discover routes, estimated costs, essential gear, and the new frontier of high-altitude adventure.",
    date: "Season 2026",
    readTime: "9 min read",
    author: "Stories by Foot Editorial Team",
  },
  {
    slug: getSlug("Things to carry in Ladakh bike trip"),
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&h=560&q=80",
    category: "Packing List",
    categoryTone: "yellow",
    tags: ["Adventure", "Ladakh", "Packing List"],
    title: "Things to carry in Ladakh bike trip",
    description:
      "The difference between a legendary adventure and a difficult ordeal lies in your luggage. Curating the definitive Ladakh motorcycle tour essentials list for 2026.",
    date: "Season 2026",
    readTime: "7 min read",
    author: "Stories by Foot Editorial Team",
  },
  {
    slug: getSlug("Petrol Pump Guide of Ladakh"),
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&h=560&q=80",
    category: "Fuel Guide",
    categoryTone: "purple",
    tags: ["Adventure", "Ladakh", "Fuel Guide"],
    title: "Petrol Pump Guide of Ladakh",
    description:
      "Managing your petrol is a strategy, not just geography. Here is the definitive guide to fueling your 2026 Himalayan expedition.",
    date: "Season 2026",
    readTime: "6 min read",
    author: "Stories by Foot Editorial Team",
  },
  {
    slug: getSlug("Zanskar the Hidden Gem"),
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&h=560&q=80",
    category: "Zanskar",
    categoryTone: "pink",
    tags: ["Adventure", "Ladakh", "Zanskar"],
    title: "Zanskar the Hidden Gem",
    description:
      "Zanskar is not just a destination; it is a feeling of raw, untouched isolation. Explore the ultimate frontier for 2026.",
    date: "Season 2026",
    readTime: "8 min read",
    author: "Stories by Foot Editorial Team",
  },
  {
    slug: getSlug("Ladakh the Land of High Passes"),
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&h=560&q=80",
    category: "Biking Guide",
    categoryTone: "green",
    tags: ["Adventure", "Ladakh", "Bike Trip"],
    title: "Ladakh the Land of High Passes",
    description:
      "Understanding the geography, culture, and logistics of Ladakh is the first step toward a successful journey. Your ultimate 2026 biking guide.",
    date: "Season 2026",
    readTime: "8 min read",
    author: "Stories by Foot Editorial Team",
  },
  {
    slug: getSlug("Aryan's Village of India in Ladakh"),
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&h=560&q=80",
    category: "Culture",
    categoryTone: "purple",
    tags: ["Adventure", "Culture", "Ladakh"],
    title: "Aryan's Village of India in Ladakh",
    description:
      "Discover the lost Aryan Valley, home to the Brokpa people and descendants of Alexander the Great's soldiers. Explore ancient traditions in this hidden Himalayan sanctuary.",
    date: "Season 2026",
    readTime: "7 min read",
    author: "Stories by Foot Editorial Team",
  },
  {
    slug: getSlug("Pregnancy Tourism In Ladakh"),
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&h=560&q=80",
    category: "Culture",
    categoryTone: "pink",
    tags: ["Culture", "Myths", "Ladakh"],
    title: "Pregnancy Tourism In Ladakh",
    description:
      "Separating fact from fiction: Understanding the reality of the Brokpa community and debunking sensationalist narratives about 'Pregnancy Tourism' in the Aryan Valley.",
    date: "Season 2026",
    readTime: "6 min read",
    author: "Stories by Foot Editorial Team",
  },
];

const EXTRA_IMAGES = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&h=560&q=80",
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&h=560&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&h=560&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&h=560&q=80",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&h=560&q=80",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&h=560&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&h=560&q=80",
];

const EXTRA_POSTS: BlogArticleItem[] = newBlogPosts.map((p, idx) => ({
  slug: p.slug,
  image: EXTRA_IMAGES[idx % EXTRA_IMAGES.length],
  category: p.tags[0] || "Travel Guide",
  categoryTone: TONES[idx % TONES.length],
  tags: p.tags,
  title: p.cardTitle,
  description: p.excerpt,
  date: "Season 2026",
  readTime: "8 min read",
  author: "Stories by Foot Editorial Team",
}));

const ALL_ARTICLES: BlogArticleItem[] = [...CLASSIC_POSTS, ...EXTRA_POSTS];

const TOPICS = ["Ladakh", "Bike Trip", "Zanskar", "Packing List", "Fuel Guide", "Culture", "Spiti", "Sikkim"];

function SearchBox() {
  const [query, setQuery] = useState("");
  const results = useMemo(
    () =>
      ALL_ARTICLES.filter((article) =>
        `${article.title} ${article.category} ${article.tags.join(" ")} ${article.description}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ).slice(0, 5),
    [query]
  );

  return (
    <div className="relative max-w-[650px]">
      <div
        className={`flex items-center rounded-[14px] border-2 bg-white px-5 shadow-[0_3px_10px_rgba(0,0,0,0.05)] ${
          query ? "border-[#fc326c] shadow-[0_3px_10px_rgba(255,105,180,0.18)]" : "border-[#e0e0e0]"
        }`}
      >
        <Search className="h-5 w-5 shrink-0 text-[#7b18cc]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Ladakh, Zanskar, packing or riding guides"
          className="w-full border-0 bg-transparent px-3 py-4 text-sm font-medium text-[#272127] outline-none placeholder:text-slate-400"
        />
      </div>
      {query && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-[14px] border border-slate-200 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          {results.length ? (
            results.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="flex items-center justify-between gap-4 rounded-lg px-3 py-3 text-sm hover:bg-[#f9f2ff]"
              >
                <span>{article.title}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#7b18cc]" />
              </Link>
            ))
          ) : (
            <p className="px-3 py-4 text-sm text-slate-500">No guides found. Try another search.</p>
          )}
        </div>
      )}
    </div>
  );
}

function MetaRow({ article }: { article: BlogArticleItem }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#696969]">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5" />
        {article.date}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="h-3.5 w-3.5" />
        {article.readTime}
      </span>
    </div>
  );
}

function ArticleCard({ article, compact = false }: { article: BlogArticleItem; compact?: boolean }) {
  return (
    <article
      className={`group overflow-hidden rounded-[1rem] border border-[#f3f5f8] bg-white shadow-[0_3px_8px_rgba(0,0,0,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(25,55,101,0.12)] ${
        compact ? "flex min-h-[170px]" : "flex flex-col"
      }`}
    >
      <Link
        to={`/blog/${article.slug}`}
        className={`${compact ? "w-2/5 shrink-0" : "aspect-[16/10]"} overflow-hidden`}
      >
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className={`${compact ? "p-4" : "flex flex-1 flex-col p-5"}`}>
        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-medium ${categoryToneClasses[article.categoryTone]}`}
        >
          {article.category}
        </span>
        <Link
          to={`/blog/${article.slug}`}
          className={`mt-3 block font-bold leading-tight text-[#272127] hover:text-[#7b18cc] ${
            compact ? "text-base" : "text-xl"
          }`}
        >
          {article.title}
        </Link>
        {!compact && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#4f5354]">{article.description}</p>
        )}
        <div className={`${compact ? "mt-4" : "mt-auto pt-6"} flex items-center justify-between gap-3`}>
          <Link
            to={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#7b18cc]"
          >
            Read more <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <span className="text-[10px] text-[#696969]">{article.date}</span>
        </div>
      </div>
    </article>
  );
}

const Blog = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featured = ALL_ARTICLES[0];

  const filteredArticles = useMemo(() => {
    if (!selectedTopic) return ALL_ARTICLES.slice(1);
    return ALL_ARTICLES.filter(
      (article) =>
        article.category.toLowerCase().includes(selectedTopic.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(selectedTopic.toLowerCase())) ||
        article.title.toLowerCase().includes(selectedTopic.toLowerCase())
    );
  }, [selectedTopic]);

  const visibleArticles = showAll || selectedTopic ? filteredArticles : filteredArticles.slice(0, 6);

  const selectTopic = (topic: string) => {
    setSelectedTopic((prev) => (prev === topic ? null : topic));
    window.setTimeout(
      () => document.getElementById("latest")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      0
    );
  };

  const essentialMain = EXTRA_POSTS[0] || ALL_ARTICLES[1];
  const essentialCompact = EXTRA_POSTS.slice(1, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#272127]">
      <SEO
        title="Himalayan Riding Stories, Guides & Travel Tips | Stories by Foot Blog"
        description="Read the latest guides, packing lists, and expert tips for your Leh Ladakh bike trip, Zanskar loops, petrol pumps in Ladakh, and Himalayan road trip survival from the Stories by Foot team."
        keywords="ladakh bike trip guide, stories by foot blog, ladakh packing list, petrol pump in ladakh, zanskar travel guide, himalayan biking stories"
      />
      <Navigation />

      <main className="flex-grow pt-20 lg:pt-24">
        {/* Search Box */}
        <section className="mx-auto max-w-[1312px] px-5 pb-6 pt-5 sm:px-6 sm:pt-6">
          <SearchBox />
        </section>

        {/* Featured Story Card */}
        <section className="mx-auto max-w-[1312px] px-5 pb-16 sm:px-6">
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-[2rem] bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] lg:grid-cols-2"
          >
            <div className="min-h-[260px] overflow-hidden lg:min-h-[340px]">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <span
                className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-medium ${categoryToneClasses[featured.categoryTone]}`}
              >
                {featured.category}
              </span>
              <h1 className="mt-5 text-3xl font-bold leading-tight text-[#272127] sm:text-4xl">
                {featured.title}
              </h1>
              <p className="mt-4 text-base leading-7 text-[#4f5354]">{featured.description}</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#38095e] text-white">
                  <Compass className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{featured.author}</p>
                  <MetaRow article={featured} />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Recent Articles Grid */}
        <section id="latest" className="mx-auto max-w-[1312px] scroll-mt-24 px-5 pb-16 sm:px-6">
          <h2 className="font-serif text-3xl font-normal text-[#272127] sm:text-4xl">
            {selectedTopic ? `${selectedTopic} Guides` : "Our Recent Articles"}
          </h2>
          <p className="mt-2 text-base text-[#4f5354]">
            Practical expedition guides, route breakdowns and riding checklists for the Himalayas.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {!selectedTopic && filteredArticles.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="mx-auto mt-12 flex items-center gap-2 rounded-full border-2 border-[#fc326c] px-6 py-2.5 text-sm font-medium text-[#fc326c] transition-colors hover:bg-[#fc326c] hover:text-white"
            >
              {showAll ? "Show fewer guides" : "View all guides"}
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </section>

        {/* Explore by Topic */}
        <section id="topics" className="border-y border-slate-100 bg-[#f9f2ff] py-14">
          <div className="mx-auto max-w-[1312px] px-5 sm:px-6">
            <h2 className="font-serif text-3xl font-normal text-[#272127] sm:text-4xl">
              Explore by topic
            </h2>
            <div className="mt-7 flex flex-wrap gap-3">
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => selectTopic(topic)}
                  className={`rounded px-3 py-1.5 text-sm font-medium transition ${
                    selectedTopic === topic
                      ? "bg-[#46077a] text-white"
                      : "bg-white text-[#5d1498] hover:bg-[#46077a] hover:text-white"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
            {selectedTopic && (
              <button
                type="button"
                onClick={() => setSelectedTopic(null)}
                className="mt-5 text-sm font-semibold text-[#7b18cc] hover:text-[#46077a]"
              >
                Show all articles <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </section>

        {/* Essential Travel Guides */}
        <section id="guides" className="mx-auto max-w-[1312px] scroll-mt-24 px-5 py-16 sm:px-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-3xl font-normal text-[#272127] sm:text-4xl">
                Essential travel guides
              </h2>
              <p className="mt-2 text-base text-[#4f5354]">
                Long-form explainers for planning permits, budgets and high-altitude routes.
              </p>
            </div>
            <Link to="/destinations" className="text-sm font-medium text-[#7b18cc] hover:underline">
              Explore tour packages →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
            <ArticleCard article={essentialMain} />
            <div className="grid gap-4">
              {essentialCompact.map((article) => (
                <ArticleCard key={article.slug} article={article} compact />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Card */}
        <section className="mx-5 mb-16 grid max-w-[1312px] gap-8 rounded-[2rem] border border-[#d5d9e0] p-6 shadow-[0_2px_5px_rgba(0,0,0,0.2)] sm:mx-auto sm:p-8 lg:grid-cols-2 lg:items-center">
          <img
            src="/cliffhanger/images/index-3-556x382.jpg"
            alt="Stories by Foot Himalayan expedition"
            className="h-64 w-full rounded-[1.5rem] object-cover"
            loading="lazy"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#7b18cc]">
              Plan your Himalayan expedition
            </p>
            <h2 className="mt-3 max-w-md text-3xl font-medium leading-tight text-[#272127]">
              Ready to ride the highest passes with confidence?
            </h2>
            <p className="mt-4 max-w-lg text-base leading-6 text-[#4f5354]">
              From Royal Enfield fleets and backup vehicles to permits and stays, our team handles every detail on the road.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#e6377a] px-7 py-3 text-sm font-semibold text-white hover:bg-[#bd245a] transition-colors"
            >
              Plan your trip <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
