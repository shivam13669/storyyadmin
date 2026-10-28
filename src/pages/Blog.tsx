import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { newBlogPosts } from "@/lib/blogPosts";
import "@/styles/blog-v2.css";

const Blog = () => {
  // New creator photos array
  const creatorPhotos = [
    "https://cdn.builder.io/api/v1/image/assets%2Fc135df136d3b488b90d8e0548092ee36%2F51e6c70dbccc449386d0318a5732c576?format=webp&width=800&height=1200",
    "https://cdn.builder.io/api/v1/image/assets%2Fc135df136d3b488b90d8e0548092ee36%2F7bd2d26944bc4be992f69ff8310f7547?format=webp&width=800&height=1200",
    "https://cdn.builder.io/api/v1/image/assets%2Fc135df136d3b488b90d8e0548092ee36%2Fc2b7edd47ed44d61ac341825985c36ec?format=webp&width=800&height=1200",
    "https://cdn.builder.io/api/v1/image/assets%2Fc135df136d3b488b90d8e0548092ee36%2Ffce0818769c54a63bffa9c4c526b5cd1?format=webp&width=800&height=1200"
  ];

  const getSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load ionicons for the blog page icons
    const scriptModule = document.createElement("script");
    scriptModule.type = "module";
    scriptModule.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
    document.body.appendChild(scriptModule);

    const scriptNoModule = document.createElement("script");
    scriptNoModule.setAttribute("nomodule", "");
    scriptNoModule.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";
    document.body.appendChild(scriptNoModule);

    return () => {
      document.body.removeChild(scriptModule);
      document.body.removeChild(scriptNoModule);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Himalayan Riding Stories, Guides & Travel Tips | Stories by Foot Blog"
        description="Read the latest guides, packing lists, and expert tips for your Leh Ladakh bike trip, Zanskar loops, petrol pumps in Ladakh, and Himalayan road trip survival from the Stories by Foot team."
        keywords="ladakh bike trip guide, stories by foot blog, ladakh packing list, petrol pump in ladakh, zanskar travel guide, himalayan biking stories"
      />
      <Navigation />

      <main className="flex-grow pt-16 blog-v2-container">
        <article>
          {/* HERO */}
          <section className="section hero" aria-label="home">
            <div className="container">
              <h1 className="h1 hero-title">
                <strong className="strong">Hey, we’re Stories by Foot.</strong> See our stories and ideas.
              </h1>

              <div className="wrapper">
                <form action="" className="newsletter-form">
                  <input type="email" name="email_address" placeholder="Your email address" className="email-field" />
                  <button type="submit" className="btn">Subscribe</button>
                </form>
                <p className="newsletter-text">
                  Get the email newsletter and unlock access to members-only content and updates
                </p>
              </div>
            </div>
          </section>

          {/* FEATURED POST */}
          <section className="section featured" aria-label="featured post">
            <div className="container">
              <p className="section-subtitle">
                Get started with our <strong className="strong">best stories</strong>
              </p>

              <ul className="has-scrollbar">
                {[
                  {
                    img: "https://cdn.builder.io/api/v1/image/assets%2F38907e16c2b24b1c9506101e9da64675%2F88c16ea4201f47efbdcac71a50d59736?format=webp&width=800&height=1200",
                    authors: [creatorPhotos[0], creatorPhotos[1]],
                    tags: ["Adventure", "Ladakh", "Bike Trip"],
                    title: "Leh Ladakh Bike Trip Guide",
                    text: "Your ultimate guide to a Leh Ladakh bike trip in 2026. Discover routes, estimated costs, essential gear, and the new frontier of high-altitude adventure."
                  },
                  {
                    img: "https://cdn.builder.io/api/v1/image/assets%2F38907e16c2b24b1c9506101e9da64675%2Fd4bae44be0e9463d88284c94c7864fb6?format=webp&width=800&height=1200",
                    authors: [creatorPhotos[2]],
                    tags: ["Adventure", "Ladakh", "Packing List"],
                    title: "Things to carry in Ladakh bike trip",
                    text: "The difference between a legendary adventure and a difficult ordeal lies in your luggage. Curating the definitive Ladakh motorcycle tour essentials list for 2026."
                  },
                  {
                    img: "https://cdn.builder.io/api/v1/image/assets%2F38907e16c2b24b1c9506101e9da64675%2Fb0d2ca0d73d543cca91fa57e3ac820d4?format=webp&width=800&height=1200",
                    authors: [creatorPhotos[3]],
                    tags: ["Adventure", "Ladakh", "Fuel Guide"],
                    title: "Petrol Pump Guide of Ladakh",
                    text: "Managing your petrol is a strategy, not just geography. Here is the definitive guide to fueling your 2026 Himalayan expedition."
                  },
                  {
                    img: "https://cdn.builder.io/api/v1/image/assets%2F38907e16c2b24b1c9506101e9da64675%2Fa3fba2d39f774b1c96d372fad4d1624f?format=webp&width=800&height=1200",
                    authors: [creatorPhotos[0], creatorPhotos[1]],
                    tags: ["Adventure", "Ladakh", "Zanskar"],
                    title: "Zanskar the Hidden Gem",
                    text: "Zanskar is not just a destination; it is a feeling of raw, untouched isolation. Explore the ultimate frontier for 2026."
                  },
                  {
                    img: "https://cdn.builder.io/api/v1/image/assets%2F38907e16c2b24b1c9506101e9da64675%2F24d24a707cc643f7805e01014c9729dc?format=webp&width=800&height=1200",
                    authors: [creatorPhotos[1]],
                    tags: ["Adventure", "Ladakh", "Biking Guide"],
                    title: "Ladakh the Land of High Passes",
                    text: "Understanding the geography, culture, and logistics of Ladakh is the first step toward a successful journey. Your ultimate 2026 biking guide."
                  },
                  {
                    img: "https://cdn.builder.io/api/v1/image/assets%2F38907e16c2b24b1c9506101e9da64675%2F185980dad62644ec9323a878100c0e46?format=webp&width=800&height=1200",
                    authors: [creatorPhotos[2]],
                    tags: ["Adventure", "Culture", "Ladakh"],
                    title: "Aryan's Village of India in Ladakh",
                    text: "Discover the lost Aryan Valley, home to the Brokpa people and descendants of Alexander the Great's soldiers. Explore the Flower Women of Ladakh and ancient traditions in this hidden Himalayan sanctuary."
                  },
                  {
                    img: "https://cdn.builder.io/api/v1/image/assets%2F38907e16c2b24b1c9506101e9da64675%2Fa653e20b16664f5180a31400843ce642?format=webp&width=800&height=1200",
                    authors: [creatorPhotos[2]],
                    tags: ["Culture", "Myths", "Ladakh"],
                    title: "Pregnancy Tourism In Ladakh",
                    text: "Separating fact from fiction: Understanding the reality of the Brokpa community and debunking sensationalist narratives about 'Pregnancy Tourism' in the Aryan Valley."
                  }
                ].map((post, index) => (
                  <li key={index} className="scrollbar-item">
                    <div className="blog-card">
                      <Link to={`/blog/${getSlug(post.title)}`} className="block">
                        <figure className="card-banner img-holder" style={{ "--width": 500, "--height": 600 } as any}>
                          <img src={post.img} width="500" height="600" loading="lazy" alt={post.title} className="img-cover" />
                          <ul className="avatar-list absolute">
                            {post.authors.map((author, aIdx) => (
                              <li key={aIdx} className="avatar-item">
                                <span className="avatar img-holder" style={{ "--width": 100, "--height": 100 } as any}>
                                  <img src={author} width="100" height="100" loading="lazy" alt="Author" className="img-cover" />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </figure>
                      </Link>
                      <div className="card-content">
                        <ul className="card-meta-list">
                          {post.tags.map((tag, tIdx) => (
                            <li key={tIdx}><span className="card-tag">{tag}</span></li>
                          ))}
                        </ul>
                        <h3 className="h4">
                          <Link to={`/blog/${post.slug || getSlug(post.title)}`} className="card-title hover:underline block">
                            <strong className="strong">{post.title}</strong>
                          </Link>
                        </h3>
                        <p className="card-text">{post.text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* RECENT POST */}
          <section className="section recent" aria-label="recent post">
            <div className="container">
              <div className="title-wrapper">
                <h2 className="h2 section-title">
                  See what we’ve <strong className="strong">written lately</strong>
                </h2>
                <div className="top-author">
                  <ul className="avatar-list">
                    {[
                      "https://cdn.builder.io/api/v1/image/assets%2Fc135df136d3b488b90d8e0548092ee36%2F51e6c70dbccc449386d0318a5732c576?format=webp&width=800&height=1200",
                      "https://cdn.builder.io/api/v1/image/assets%2Fc135df136d3b488b90d8e0548092ee36%2F7bd2d26944bc4be992f69ff8310f7547?format=webp&width=800&height=1200",
                      "https://cdn.builder.io/api/v1/image/assets%2Fc135df136d3b488b90d8e0548092ee36%2Fc2b7edd47ed44d61ac341825985c36ec?format=webp&width=800&height=1200",
                      "https://cdn.builder.io/api/v1/image/assets%2Fc135df136d3b488b90d8e0548092ee36%2Ffce0818769c54a63bffa9c4c526b5cd1?format=webp&width=800&height=1200"
                    ].map((img, i) => (
                      <li key={i} className="avatar-item">
                        <a href="#" className="avatar large img-holder" style={{ "--width": 100, "--height": 100 } as any}>
                          <img src={img} width="100" height="100" alt="top author" className="img-cover" />
                        </a>
                      </li>
                    ))}
                  </ul>
                  <span className="span">Meet our top authors</span>
                </div>
              </div>

              <ul className="grid-list">
                {newBlogPosts.map((p) => ({
                  slug: p.slug,
                  img: p.img,
                  authors: p.authors.map((i) => creatorPhotos[i]),
                  tags: p.tags,
                  title: p.cardTitle,
                  text: p.excerpt,
                })).map((post, index) => (
                  <li key={index}>
                    <div className="blog-card">
                      <Link to={`/blog/${post.slug || getSlug(post.title)}`} className="block">
                        <figure className="card-banner img-holder" style={{ "--width": 550, "--height": 660 } as any}>
                          <img src={post.img} width="550" height="660" loading="lazy" alt={post.title} className="img-cover" />
                          <ul className="avatar-list absolute">
                            {post.authors.map((author, aIdx) => (
                              <li key={aIdx} className="avatar-item">
                                <span className="avatar img-holder" style={{ "--width": 100, "--height": 100 } as any}>
                                  <img src={author} width="100" height="100" loading="lazy" alt="Author" className="img-cover" />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </figure>
                      </Link>
                      <div className="card-content">
                        <ul className="card-meta-list">
                          {post.tags.map((tag, tIdx) => (
                            <li key={tIdx}><span className="card-tag">{tag}</span></li>
                          ))}
                        </ul>
                        <h3 className="h4">
                          <Link to={`/blog/${getSlug(post.title)}`} className="card-title hover:underline block">
                            <strong className="strong">{post.title}</strong>
                          </Link>
                        </h3>
                        <p className="card-text">{post.text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <button className="btn" style={{ marginInline: "auto", marginBlock: "50px 30px" }}>Load more</button>
            </div>
          </section>

          {/* NEWSLETTER */}
          <section className="section newsletter">
            <h2 className="h2 section-title">
              Subscribe to <strong className="strong">new posts</strong>
            </h2>
            <form action="" className="newsletter-form">
              <input type="email" name="email_address" placeholder="Your email address" required className="email-field" />
              <button type="submit" className="btn">Subscribe</button>
            </form>
          </section>
        </article>
      </main>

    </div>
  );
};

export default Blog;
