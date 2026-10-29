import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { destinations } from "@/data/destinations";
import { buildHomeSEO } from "@/lib/seoShared";

const Index = () => {
  const homeSEO = buildHomeSEO(destinations);

  return (
    <div className="w-full flex flex-col">
      <SEO
        title={homeSEO.title}
        description={homeSEO.description}
        keywords={homeSEO.keywords}
        image={homeSEO.image}
        url={homeSEO.url}
        schema={homeSEO.schema}
      />
      <Navigation />
      {/* Screen-reader / crawler summary of the homepage. The visual homepage lives in an iframe, which
          search engines may not attribute to this URL — this gives "/" its own H1 and crawlable links. */}
      <section className="sr-only" aria-label="About Stories by Foot">
        <h1>Ultimate Adventure &amp; Motorbike Tours – Conquer The Himalayas</h1>
        <p>
          Stories by Foot organises guided Ladakh bike trips and Himalayan adventure tours to Zanskar, Tawang, Bhutan,
          Nepal and Meghalaya.
        </p>
        <h2>Popular Destinations</h2>
        <ul>
          {destinations.map((d) => (
            <li key={d.slug}>
              <Link to={`/destinations/${d.slug}`}>{d.name} tour packages</Link> – {d.tagline}
            </li>
          ))}
        </ul>
        <h2>Tour Packages</h2>
        <ul>
          {destinations.flatMap((d) =>
            d.packages.map((p) => (
              <li key={p.slug}>
                <Link to={`/destinations/${d.slug}/${p.slug}`}>{p.name}</Link> – {d.name}, {p.duration}, from {p.price}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
};

export default Index;
