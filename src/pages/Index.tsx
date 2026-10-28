import Navigation from "@/components/Navigation";
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
    </div>
  );
};

export default Index;
