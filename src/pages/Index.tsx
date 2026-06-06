import Navigation from "@/components/Navigation";
import { useEffect } from "react";
import "@/styles/cliffhanger-scoped.css";

const Index = () => {
  useEffect(() => {
    let active = true;

    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.body.appendChild(script);
      });
    };

    const init = async () => {
      try {
        // Load legacy core/plugins, then trigger the scoped init script
        await loadScript("/cliffhanger/js/core.min.js");
        await loadScript("/cliffhanger/js/script-scoped.js");
        
        if (active && typeof (window as any).initCliffhanger === "function") {
          (window as any).initCliffhanger();
        }
      } catch (err) {
        console.error("Failed to load cliffhanger scripts", err);
      }
    };

    init();

    return () => {
      active = false;
      if (typeof (window as any).destroyCliffhanger === "function") {
        (window as any).destroyCliffhanger();
      }
    };
  }, []);

  return (
    <div className="w-full bg-white flex flex-col pt-16 min-h-screen">
      <Navigation />

      <div className="cliffhanger-body">
        <div className="page">
          {/* Swiper*/}
          <section className="section swiper-container swiper-slider swiper-slider-corporate swiper-pagination-style-2" data-loop="true" data-autoplay="5000" data-simulate-touch="true" data-nav="false" data-direction="vertical">
            <div className="swiper-wrapper text-left">
              <div className="swiper-slide context-dark" data-slide-bg="https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2Fe413e4f9377b436f9b2830f4d4d696c4?format=webp&width=1920&height=1080">
                <div className="swiper-slide-caption section-md">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-10">
                        <h6 className="text-uppercase" data-caption-animate="fadeInRight" data-caption-delay="0">Ultimate Adventure & Motorbike Tours</h6>
                        <h2 className="oh font-weight-light" data-caption-animate="slideInUp" data-caption-delay="100"><span>Conquer</span><span className="font-weight-bold"> The Himalayas</span></h2><a className="button button-default-outline button-ujarak" href="/destinations" target="_parent" data-caption-animate="fadeInLeft" data-caption-delay="0">Explore Tours</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide context-dark" data-slide-bg="https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2Fcb35e2849362485493f50fa8a980c199?format=webp&width=1920&height=1080">
                <div className="swiper-slide-caption section-md">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-10">
                        <h6 className="text-uppercase" data-caption-animate="fadeInRight" data-caption-delay="0">Ladakh, Spiti, Zanskar, Bhutan, Nepal, Sikkim & Tawang</h6>
                        <h2 className="oh font-weight-light" data-caption-animate="slideInUp" data-caption-delay="100"><span>Unforgettable</span><span className="font-weight-bold"> Expeditions</span></h2><a className="button button-default-outline button-ujarak" href="/destinations" target="_parent" data-caption-animate="fadeInLeft" data-caption-delay="0">Start Your Journey</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide context-dark" data-slide-bg="https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2Fb43a1ae1012c4304b871c14da4052c20?format=webp&width=1920&height=1080">
                <div className="swiper-slide-caption section-md">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-10">
                        <h6 className="text-uppercase" data-caption-animate="fadeInRight" data-caption-delay="0">Expert Guides & Trusted Safety Standards</h6>
                        <h2 className="oh font-weight-light" data-caption-animate="slideInUp" data-caption-delay="100"><span>Explore With</span><span className="font-weight-bold"> Confidence</span></h2><a className="button button-default-outline button-ujarak" href="/contact" target="_parent" data-caption-animate="fadeInLeft" data-caption-delay="0">Get in touch</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide context-dark" data-slide-bg="https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2F9594b942348f416db273b387c03cbfbc?format=webp&width=1920&height=1080">
                <div className="swiper-slide-caption section-md">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-10">
                        <h6 className="text-uppercase" data-caption-animate="fadeInRight" data-caption-delay="0">Discover Hidden Gems</h6>
                        <h2 className="oh font-weight-light" data-caption-animate="slideInUp" data-caption-delay="100"><span>Unveil</span><span className="font-weight-bold"> The Unknown</span></h2><a className="button button-default-outline button-ujarak" href="/destinations" target="_parent" data-caption-animate="fadeInLeft" data-caption-delay="0">Explore Tours</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide context-dark" data-slide-bg="https://cdn.builder.io/api/v1/image/assets%2F76004f6138934696a9d5b53b7a2ec8b1%2F5061e66c75644089a066b3dc02fb3282?format=webp&width=1920&height=1080">
                <div className="swiper-slide-caption section-md">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-10">
                        <h6 className="text-uppercase" data-caption-animate="fadeInRight" data-caption-delay="0">Create Lasting Memories</h6>
                        <h2 className="oh font-weight-light" data-caption-animate="slideInUp" data-caption-delay="100"><span>Journey of a</span><span className="font-weight-bold"> Lifetime</span></h2><a className="button button-default-outline button-ujarak" href="/contact" target="_parent" data-caption-animate="fadeInLeft" data-caption-delay="0">Get in touch</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Swiper Pagination*/}
            <div className="swiper-pagination"></div>
          </section>
          
          {/* Section Box Categories*/}
          <section className="section section-lg section-top-1 bg-gray-4">
            <div className="container offset-negative-1">
              <div className="box-categories cta-box-wrap">
                <div className="box-categories-content">
                  <div className="row justify-content-center">
                    <div className="col-md-4 wow fadeInDown col-9" data-wow-delay=".2s">
                      <ul className="list-marked-2 box-categories-list">
                        <li><a href="#"><img src="/cliffhanger/images/cta-1-368x420.jpg" alt="" width="368" height="420"/></a>
                          <h5 className="box-categories-title">Balloon Flights</h5>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4 wow fadeInDown col-9" data-wow-delay=".2s">
                      <ul className="list-marked-2 box-categories-list">
                        <li><a href="#"><img src="/cliffhanger/images/cta-2-368x420.jpg" alt="" width="368" height="420"/></a>
                          <h5 className="box-categories-title">Mountain Holiday</h5>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4 wow fadeInDown col-9" data-wow-delay=".2s">
                      <ul className="list-marked-2 box-categories-list">
                        <li><a href="#"><img src="/cliffhanger/images/cta-3-368x420.jpg" alt="" width="368" height="420"/></a>
                          <h5 className="box-categories-title">Beach Holidays</h5>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div><a className="link-classic wow fadeInUp" href="#">Other Tours<span></span></a>
              {/* Owl Carousel*/}
            </div>
          </section>
          
          {/* Discover New Horizons*/}
          <section className="section section-sm section-first bg-default text-md-left">
            <div className="container">
              <div className="row row-50 align-items-center justify-content-center justify-content-xl-between">
                <div className="col-lg-6 text-center wow fadeInUp"><img src="/cliffhanger/images/index-3-556x382.jpg" alt="" width="556" height="382"/>
                </div>
                <div className="col-lg-6 wow fadeInRight" data-wow-delay=".1s">
                  <div className="box-width-lg-470">
                    <h3>Discover New Horizons</h3>
                    {/* Bootstrap tabs*/}
                    <div className="tabs-custom tabs-horizontal tabs-line tabs-line-big tabs-line-style-2 text-center text-md-left" id="tabs-7">
                      {/* Nav tabs*/}
                      <ul className="nav nav-tabs">
                        <li className="nav-item" role="presentation"><a className="nav-link active" href="#tabs-7-1" data-toggle="tab">About us</a></li>
                        <li className="nav-item" role="presentation"><a className="nav-link" href="#tabs-7-2" data-toggle="tab">Why choose us</a></li>
                        <li className="nav-item" role="presentation"><a className="nav-link" href="#tabs-7-3" data-toggle="tab">Our mission</a></li>
                      </ul>
                      {/* Tab panes*/}
                      <div className="tab-content">
                        <div className="tab-pane fade show active" id="tabs-7-1">
                          <p>Stories by Foot is committed to bringing our clients the best in value and quality travel arrangements. We are passionate about travel and sharing the world's wonders with you.</p>
                          <div className="group-md group-middle"><a className="button button-secondary button-pipaluk" href="/contact" target="_parent">Get in Touch</a><a className="button button-black-outline button-md" href="/about" target="_parent">Read More</a></div>
                        </div>
                        <div className="tab-pane fade" id="tabs-7-2">
                          <p>We are proud to offer excellent quality and value for money in our tours, which give you the chance to experience your chosen destination in an authentic and exciting way.</p>
                          <div className="group-md group-middle"><a className="button button-secondary button-pipaluk" href="/contact" target="_parent">Get in Touch</a><a className="button button-black-outline button-md" href="/about" target="_parent">Read More</a></div>
                        </div>
                        <div className="tab-pane fade" id="tabs-7-3">
                          <p>Our mission is to provide the ultimate travel planning experience while becoming a one-stop shop for every travel service available in the industry.</p>
                          <div className="group-md group-middle"><a className="button button-secondary button-pipaluk" href="/contact" target="_parent">Get in Touch</a><a className="button button-black-outline button-md" href="/about" target="_parent">Read More</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/*	Our Services*/}
          <section className="section section-sm">
            <div className="container">
              <h3>Our Services</h3>
              <div className="row row-30">
                <div className="col-sm-6 col-lg-4">
                  <article className="box-icon-classic">
                    <div className="unit box-icon-classic-body flex-column flex-md-row text-md-left flex-lg-column text-lg-center flex-xl-row text-xl-left">
                      <div className="unit-left">
                        <div className="box-icon-classic-icon fl-bigmug-line-equalization3"></div>
                      </div>
                      <div className="unit-body">
                        <h5 className="box-icon-classic-title"><a href="#">Personalized Matching</a></h5>
                        <p className="box-icon-classic-text">Our unique matching system lets you find just the tour you want for your next holiday.</p>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="col-sm-6 col-lg-4">
                  <article className="box-icon-classic">
                    <div className="unit box-icon-classic-body flex-column flex-md-row text-md-left flex-lg-column text-lg-center flex-xl-row text-xl-left">
                      <div className="unit-left">
                        <div className="box-icon-classic-icon fl-bigmug-line-circular220"></div>
                      </div>
                      <div className="unit-body">
                        <h5 className="box-icon-classic-title"><a href="#">Wide Variety of Tours</a></h5>
                        <p className="box-icon-classic-text">We offer a wide variety of personally picked tours with destinations all over the globe.</p>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="col-sm-6 col-lg-4">
                  <article className="box-icon-classic">
                    <div className="unit box-icon-classic-body flex-column flex-md-row text-md-left flex-lg-column text-lg-center flex-xl-row text-xl-left">
                      <div className="unit-left">
                        <div className="box-icon-classic-icon fl-bigmug-line-favourites5"></div>
                      </div>
                      <div className="unit-body">
                        <h5 className="box-icon-classic-title"><a href="#">Highly Qualified Service</a></h5>
                        <p className="box-icon-classic-text">Our tour managers are qualified, skilled, and friendly to bring you the best service.</p>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="col-sm-6 col-lg-4">
                  <article className="box-icon-classic">
                    <div className="unit box-icon-classic-body flex-column flex-md-row text-md-left flex-lg-column text-lg-center flex-xl-row text-xl-left">
                      <div className="unit-left">
                        <div className="box-icon-classic-icon fl-bigmug-line-headphones32"></div>
                      </div>
                      <div className="unit-body">
                        <h5 className="box-icon-classic-title"><a href="#">24/7 Support</a></h5>
                        <p className="box-icon-classic-text">You can always get professional support from our staff 24/7 and ask any question you have.</p>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="col-sm-6 col-lg-4">
                  <article className="box-icon-classic">
                    <div className="unit box-icon-classic-body flex-column flex-md-row text-md-left flex-lg-column text-lg-center flex-xl-row text-xl-left">
                      <div className="unit-left">
                        <div className="box-icon-classic-icon fl-bigmug-line-hot67"></div>
                      </div>
                      <div className="unit-body">
                        <h5 className="box-icon-classic-title"><a href="#">Handpicked Hotels</a></h5>
                        <p className="box-icon-classic-text">Our team offers only the best selection of affordable and luxury hotels to our clients.</p>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="col-sm-6 col-lg-4">
                  <article className="box-icon-classic">
                    <div className="unit box-icon-classic-body flex-column flex-md-row text-md-left flex-lg-column text-lg-center flex-xl-row text-xl-left">
                      <div className="unit-left">
                        <div className="box-icon-classic-icon fl-bigmug-line-wallet26"></div>
                      </div>
                      <div className="unit-body">
                        <h5 className="box-icon-classic-title"><a href="#">Best Price Guarantee</a></h5>
                        <p className="box-icon-classic-text">If you find tours that are cheaper than ours, we will compensate the difference.</p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
          
          {/* Most Loved Destinations */}
          <section className="section" style={{ position: "relative", backgroundImage: "url('https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=1920&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center", padding: "120px 0", overflow: "visible" }}>
            {/* Dark Overlay */}
            <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", background: "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%)", zIndex: "1" }}></div>
            
            <div className="container" style={{ position: "relative", zIndex: "2" }}>
              <div className="text-center" style={{ marginBottom: "60px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", color: "#fff", fontSize: "16px", fontWeight: "600", fontFamily: "'Poppins', sans-serif", marginBottom: "20px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 20c2-2 4-2 6-2s4 2 6 2 4-2 6-2 4 2 6 2"></path>
                    <path d="M12 18v-8"></path>
                    <path d="M12 10c-1-3-4-4-6-3-2 1-3 3-2 5 2 2 5 1 8-2z"></path>
                    <path d="M12 10c1-3 4-4 6-3 2 1 3 3 2 5-2 2-5 1-8-2z"></path>
                  </svg>
                  Most Loved Destinations
                </div>
                <h2 style={{ color: "#fff", fontFamily: "'Montserrat', sans-serif", fontWeight: "700", fontSize: "48px", lineHeight: "1.2", maxWidth: "800px", margin: "0 auto" }}>Explore The World’s Most Popular Destinations</h2>
              </div>
              
              <div className="row justify-content-center">
                <div className="col-12" style={{ maxWidth: "580px", margin: "0 auto", paddingTop: "12px" }}>
                  <div className="owl-carousel" data-items="1" data-sm-items="1" data-md-items="1" data-lg-items="1" data-xl-items="1" data-margin="30" data-autoplay="true" data-loop="true" data-nav="false" data-dots="false" data-mouse-drag="true" data-autoplay-timeout="3000">
                    
                    {/* Japan Card */}
                    <a href="#" className="destination-card" style={{ display: "block", position: "relative", borderRadius: "24px", overflow: "hidden", textDecoration: "none", transition: "all 0.4s ease", transform: "translateY(0)", width: "100%", height: "380px" }}>
                      <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop" alt="Japan" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.8s ease" }} className="dest-img" />
                      <div style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0", background: "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.9) 100%)" }}></div>
                      
                      <div style={{ position: "absolute", top: "20px", right: "20px", width: "44px", height: "44px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", transition: "all 0.3s ease" }} className="dest-arrow">
                        <span className="icon fa fa-arrow-right" style={{ transform: "rotate(-45deg)", fontSize: "16px" }}></span>
                      </div>
                      
                      <div style={{ position: "absolute", bottom: "30px", left: "30px", right: "30px", textAlign: "left" }}>
                        <h3 style={{ color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: "700", fontSize: "28px", marginBottom: "8px", letterSpacing: "-0.5px" }}>Japan</h3>
                        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", margin: "0", fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>Technology, vibrant nightlife & traditions</p>
                      </div>
                    </a>
    
                    {/* Switzerland Card */}
                    <a href="#" className="destination-card" style={{ display: "block", position: "relative", borderRadius: "24px", overflow: "hidden", textDecoration: "none", transition: "all 0.4s ease", transform: "translateY(0)", width: "100%", height: "380px" }}>
                      <img src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop" alt="Switzerland" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.8s ease" }} className="dest-img" />
                      <div style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0", background: "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.9) 100%)" }}></div>
                      
                      <div style={{ position: "absolute", top: "20px", right: "20px", width: "44px", height: "44px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", transition: "all 0.3s ease" }} className="dest-arrow">
                        <span className="icon fa fa-arrow-right" style={{ transform: "rotate(-45deg)", fontSize: "16px" }}></span>
                      </div>
                      
                      <div style={{ position: "absolute", bottom: "30px", left: "30px", right: "30px", textAlign: "left" }}>
                        <h3 style={{ color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: "700", fontSize: "28px", marginBottom: "8px", letterSpacing: "-0.5px" }}>Switzerland</h3>
                        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", margin: "0", fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>Stunning landscapes and pure alpine beauty</p>
                      </div>
                    </a>
    
                    {/* Paris Card */}
                    <a href="#" className="destination-card" style={{ display: "block", position: "relative", borderRadius: "24px", overflow: "hidden", textDecoration: "none", transition: "all 0.4s ease", transform: "translateY(0)", width: "100%", height: "380px" }}>
                      <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop" alt="Paris" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.8s ease" }} className="dest-img" />
                      <div style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0", background: "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.9) 100%)" }}></div>
                      
                      <div style={{ position: "absolute", top: "20px", right: "20px", width: "44px", height: "44px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", transition: "all 0.3s ease" }} className="dest-arrow">
                        <span className="icon fa fa-arrow-right" style={{ transform: "rotate(-45deg)", fontSize: "16px" }}></span>
                      </div>
                      
                      <div style={{ position: "absolute", bottom: "30px", left: "30px", right: "30px", textAlign: "left" }}>
                        <h3 style={{ color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: "700", fontSize: "28px", marginBottom: "8px", letterSpacing: "-0.5px" }}>Paris</h3>
                        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", margin: "0", fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>City of light, love, and endless romance</p>
                      </div>
                    </a>
    
                  </div>
                </div>
              </div>
            </div>
            <style>{`
              .destination-card:hover {
                transform: translateY(-8px) !important;
              }
            `}</style>
          </section>
          
          {/* Hot tours*/}
          <section className="section section-sm bg-default">
            <div className="container">
              <h3 className="oh-desktop"><span className="d-inline-block wow slideInDown">Hot Tours</span></h3>
              <div className="row row-sm row-40 row-md-50">
                <div className="col-sm-6 col-md-12 wow fadeInRight">
                  {/* Product Big*/}
                  <article className="product-big">
                    <div className="unit flex-column flex-md-row align-items-md-stretch">
                      <div className="unit-left"><a className="product-big-figure" href="#"><img src="https://cdn.builder.io/api/v1/image/assets%2F4115ef14871b4c9f98220cd4c098fc4d%2Ffd209fc8b4f148bc938f2bae1f79a749?format=webp" alt="Trans Himalayan Ride" width={600} height={366}/></a></div>
                      <div className="unit-body">
                        <div className="product-big-body">
                          <h5 className="product-big-title"><a href="#">Trans Himalayan Ride</a></h5>
                          <div className="group-sm group-middle justify-content-start">
                            <div className="product-big-rating"><span className="icon material-icons-star"></span><span className="icon material-icons-star"></span><span className="icon material-icons-star"></span><span className="icon material-icons-star"></span><span className="icon material-icons-star"></span></div><a className="product-big-reviews" href="#">315 customer reviews</a>
                          </div>
                          <p className="product-big-text">A grand circuit spanning over 3000 kilometers from the plains of Chandigarh to the highest reaches of the trans-Himalayan desert. Conquer legendary passes and experience Ladakh's most remote frontiers...</p><a className="button button-black-outline button-ujarak" href="#">Book This Tour</a>
                          <div className="product-big-price-wrap"><span className="product-big-price">₹25,499</span></div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="col-sm-6 col-md-12 wow fadeInLeft">
                  {/* Product Big*/}
                  <article className="product-big">
                    <div className="unit flex-column flex-md-row align-items-md-stretch">
                      <div className="unit-left"><a className="product-big-figure" href="#"><img src="https://cdn.builder.io/api/v1/image/assets%2F4115ef14871b4c9f98220cd4c098fc4d%2Fec67ce82355543d1b932ec13c367b77b?format=webp" alt="Khardungla Changla Loop" width={600} height={366}/></a></div>
                      <div className="unit-body">
                        <div className="product-big-body">
                          <h5 className="product-big-title"><a href="#">Khardungla Changla Loop</a></h5>
                          <div className="group-sm group-middle justify-content-start">
                            <div className="product-big-rating"><span className="icon material-icons-star"></span><span className="icon material-icons-star"></span><span className="icon material-icons-star"></span><span className="icon material-icons-star"></span><span className="icon material-icons-star_half"></span></div><a className="product-big-reviews" href="#">428 customer reviews</a>
                          </div>
                          <p className="product-big-text">Embark on a breathtaking 6-day journey through the majestic landscapes of Ladakh. Experience high-altitude adventure with the legendary Khardungla and Changla passes, serene Pangong Lake, mystical monasteries, and the enchanting Nubra Valley...</p><a className="button button-black-outline button-ujarak" href="#">Book This Tour</a>
                          <div className="product-big-price-wrap"><span className="product-big-price">₹18,333</span></div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
          
          {/* Different People*/}
          <section className="section section-sm">
            <div className="container">
              <h3 className="title-block find-car oh"><span className="d-inline-block wow slideInUp">Different People — One Mission</span></h3>
              <div className="row row-30 justify-content-center box-ordered">
                <div className="col-sm-6 col-md-4 col-lg-4">
                  {/* Team Modern*/}
                  <article className="team-modern">
                    <div className="team-modern-header"><a className="team-modern-figure" href="#"><img className="img-circles" src="/cliffhanger/images/NMishra.jpeg" alt="Nitin" width={118} height={118} style={{ objectFit: "cover", height: "118px" }}/></a>
                      <svg x="0px" y="0px" width="270px" height="70px" viewBox="0 0 270 70" enableBackground="new 0 0 270 70" xmlSpace="preserve">
                        <g>
                          <path fill="#161616" d="M202.085,0C193.477,28.912,166.708,50,135,50S76.523,28.912,67.915,0H0v70h270V0H202.085z"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="team-modern-caption">
                      <h6 className="team-modern-name"><a href="#">Nitin</a></h6>
                      <p className="team-modern-status">Founder</p>
                      <p style={{ fontSize: "13px", lineHeight: "1.6", marginTop: "12px", color: "#777" }}>A young travel enthusiast who has explored India extensively, now passionately curating unforgettable memories for our guests.</p>
                    </div>
                  </article>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  {/* Team Modern*/}
                  <article className="team-modern">
                    <div className="team-modern-header"><a className="team-modern-figure" href="#"><img className="img-circles" src="/cliffhanger/images/sAnand.jpg" alt="Shivam Anand" width={118} height={118} style={{ objectFit: "cover", height: "118px" }}/></a>
                      <svg x="0px" y="0px" width="270px" height="70px" viewBox="0 0 270 70" enableBackground="new 0 0 270 70" xmlSpace="preserve">
                        <g>
                          <path fill="#161616" d="M202.085,0C193.477,28.912,166.708,50,135,50S76.523,28.912,67.915,0H0v70h270V0H202.085z"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="team-modern-caption">
                      <h6 className="team-modern-name"><a href="#">Shivam Anand</a></h6>
                      <p className="team-modern-status">Tech Lead</p>
                      <p style={{ fontSize: "13px", lineHeight: "1.6", marginTop: "12px", color: "#777" }}>A seasoned software engineer blending deep technical expertise with innovation to build seamless digital experiences.</p>
                    </div>
                  </article>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  {/* Team Modern*/}
                  <article className="team-modern">
                    <div className="team-modern-header"><a className="team-modern-figure" href="#"><img className="img-circles" src="/cliffhanger/images/Jmishra.png" alt="Jagannath Mishra" width={118} height={118} style={{ objectFit: "cover", height: "118px" }}/></a>
                      <svg x="0px" y="0px" width="270px" height="70px" viewBox="0 0 270 70" enableBackground="new 0 0 270 70" xmlSpace="preserve">
                        <g>
                          <path fill="#161616" d="M202.085,0C193.477,28.912,166.708,50,135,50S76.523,28.912,67.915,0H0v70h270V0H202.085z"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="team-modern-caption">
                      <h6 className="team-modern-name"><a href="#">Jagannath Mishra</a></h6>
                      <p className="team-modern-status">Advisor</p>
                      <p style={{ fontSize: "13px", lineHeight: "1.6", marginTop: "12px", color: "#777" }}>Indian Army Veteran (22 yrs). Brings unmatched strategic expertise in complex logistics, terrain navigation, and ultimate safety.</p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
          
          {/* Section Subscribe*/}
          <section className="section bg-default text-center offset-top-50">
            <div className="parallax-container" data-parallax-img="/cliffhanger/images/parallax-1-1920x850.jpg">
              <div className="parallax-content section-xl section-inset-custom-1 context-dark bg-overlay-2-21">
                <div className="container">
                  <h2 className="heading-2 oh font-weight-normal wow slideInDown"><span className="d-block font-weight-semi-bold">First-class Impressions</span><span className="d-block font-weight-light">are Waiting for You!</span></h2>
                  <p className="text-width-medium text-spacing-75 wow fadeInLeft" data-wow-delay=".1s">Our agency offers travelers various tours and excursions with destinations all over the world. Browse our website to find your dream tour!</p><a className="button button-secondary button-pipaluk" href="#">Book a Tour Now</a>
                </div>
              </div>
            </div>
          </section>
          
          {/*	Instagrram wondertour*/}
          <section className="section section-sm section-top-0 section-fluid section-relative bg-gray-4">
            <div className="container-fluid">
              <h6 className="gallery-title">Gallery</h6>
              {/* Owl Carousel*/}
              <div className="owl-carousel owl-classic owl-dots-secondary" data-items="1" data-sm-items="2" data-md-items="3" data-lg-items="4" data-xl-items="5" data-xxl-items="6" data-stage-padding="15" data-xxl-stage-padding="0" data-margin="30" data-autoplay="true" data-nav="true" data-dots="true">
                {/* Thumbnail Classic*/}
                <article className="thumbnail thumbnail-mary">
                  <div className="thumbnail-mary-figure"><img src="/cliffhanger/images/gallery-image-1-270x195.jpg" alt="" width="270" height="195"/>
                  </div>
                  <div className="thumbnail-mary-caption"><a className="icon fl-bigmug-line-zoom60" href="/cliffhanger/images/gallery-image-1-1200x800-original.jpg" data-lightgallery="item"><img src="/cliffhanger/images/gallery-image-1-270x195.jpg" alt="" width="270" height="195"/></a>
                  </div>
                </article>
                {/* Thumbnail Classic*/}
                <article className="thumbnail thumbnail-mary">
                  <div className="thumbnail-mary-figure"><img src="/cliffhanger/images/gallery-image-2-270x195.jpg" alt="" width="270" height="195"/>
                  </div>
                  <div className="thumbnail-mary-caption"><a className="icon fl-bigmug-line-zoom60" href="/cliffhanger/images/gallery-image-2-1200x800-original.jpg" data-lightgallery="item"><img src="/cliffhanger/images/gallery-image-2-270x195.jpg" alt="" width="270" height="195"/></a>
                  </div>
                </article>
                {/* Thumbnail Classic*/}
                <article className="thumbnail thumbnail-mary">
                  <div className="thumbnail-mary-figure"><img src="/cliffhanger/images/gallery-image-3-270x195.jpg" alt="" width="270" height="195"/>
                  </div>
                  <div className="thumbnail-mary-caption"><a className="icon fl-bigmug-line-zoom60" href="/cliffhanger/images/gallery-image-3-1200x800-original.jpg" data-lightgallery="item"><img src="/cliffhanger/images/gallery-image-3-270x195.jpg" alt="" width="270" height="195"/></a>
                  </div>
                </article>
                {/* Thumbnail Classic*/}
                <article className="thumbnail thumbnail-mary">
                  <div className="thumbnail-mary-figure"><img src="/cliffhanger/images/gallery-image-4-270x195.jpg" alt="" width="270" height="195"/>
                  </div>
                  <div className="thumbnail-mary-caption"><a className="icon fl-bigmug-line-zoom60" href="/cliffhanger/images/gallery-image-4-1200x800-original.jpg" data-lightgallery="item"><img src="/cliffhanger/images/gallery-image-4-270x195.jpg" alt="" width="270" height="195"/></a>
                  </div>
                </article>
                {/* Thumbnail Classic*/}
                <article className="thumbnail thumbnail-mary">
                  <div className="thumbnail-mary-figure"><img src="/cliffhanger/images/gallery-image-5-270x195.jpg" alt="" width="270" height="195"/>
                  </div>
                  <div className="thumbnail-mary-caption"><a className="icon fl-bigmug-line-zoom60" href="/cliffhanger/images/gallery-image-5-1200x800-original.jpg" data-lightgallery="item"><img src="/cliffhanger/images/gallery-image-5-270x195.jpg" alt="" width="270" height="195"/></a>
                  </div>
                </article>
                {/* Thumbnail Classic*/}
                <article className="thumbnail thumbnail-mary">
                  <div className="thumbnail-mary-figure"><img src="/cliffhanger/images/gallery-image-6-270x195.jpg" alt="" width="270" height="195"/>
                  </div>
                  <div className="thumbnail-mary-caption"><a className="icon fl-bigmug-line-zoom60" href="/cliffhanger/images/gallery-image-6-1200x800-original.jpg" data-lightgallery="item"><img src="/cliffhanger/images/gallery-image-6-270x195.jpg" alt="" width="270" height="195"/></a>
                  </div>
                </article>
                {/* Thumbnail Classic*/}
                <article className="thumbnail thumbnail-mary">
                  <div className="thumbnail-mary-figure"><img src="/cliffhanger/images/gallery-image-7-270x195.jpg" alt="" width="270" height="195"/>
                  </div>
                  <div className="thumbnail-mary-caption"><a className="icon fl-bigmug-line-zoom60" href="/cliffhanger/images/gallery-image-7-1200x800-original.jpg" data-lightgallery="item"><img src="/cliffhanger/images/gallery-image-7-270x195.jpg" alt="" width="270" height="195"/></a>
                  </div>
                </article>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="section section-sm bg-gray-4 pb-5 pt-0">
            <div className="container">
              <div className="cta-custom" style={{ position: "relative", borderRadius: "24px", overflow: "hidden", padding: "80px 60px", backgroundImage: "url('https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1920&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}>
                {/* Dark Overlay */}
                <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)", zIndex: "1" }}></div>
                
                {/* Content */}
                <div style={{ position: "relative", zIndex: "2", maxWidth: "650px" }}>
                  <div style={{ display: "block", width: "100%" }}>
                    <h2 style={{ color: "white", fontWeight: "700", lineHeight: "1.1", fontSize: "56px", marginBottom: "0", marginTop: "0", fontFamily: "'Montserrat', sans-serif", textAlign: "left" }}>Nature Reimagined</h2>
                    <h2 style={{ color: "#ffc107", fontWeight: "700", lineHeight: "1.1", fontSize: "56px", marginBottom: "24px", marginTop: "0", fontFamily: "'Montserrat', sans-serif", textAlign: "left" }}>Visit us.</h2>
                  </div>
                  
                  <p style={{ color: "#f0f0f0", fontSize: "18px", marginBottom: "40px", fontWeight: "400", lineHeight: "1.6", fontFamily: "'Poppins', sans-serif", textAlign: "left" }}>
                    Rediscover nature's wonders in a way you've never imagined.<br />
                    Visit us for a unique adventure.
                  </p>
                  
                  <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
                    <a href="#" style={{ background: "white", color: "black", padding: "14px 36px", borderRadius: "30px", fontWeight: "600", fontSize: "15px", textDecoration: "none", transition: "all 0.3s ease", fontFamily: "'Poppins', sans-serif" }}>Reserve Now</a>
                    <a href="tel:+916205129118" style={{ background: "rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 255, 255, 0.2)", color: "white", padding: "13px 28px", borderRadius: "30px", fontWeight: "500", fontSize: "15px", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", transition: "all 0.3s ease", fontFamily: "'Poppins', sans-serif", backdropFilter: "blur(4px)" }}>
                      <span className="icon fa fa-phone" style={{ fontSize: "16px" }}></span> +91 6205129118
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
