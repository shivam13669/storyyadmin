import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

const HeroSlider = () => {
  const slides = [
    {
      image: "https://raw.githubusercontent.com/shivam13669/cliffhanger2/main/images/slider-4-slide-1-1920x678.jpg",
      subtitle: "Enjoy the Best Destinations with Our Travel Agency",
      title: "Explore The World",
      cta: "Get in touch"
    },
    {
      image: "https://raw.githubusercontent.com/shivam13669/cliffhanger2/main/images/slider-4-slide-2-1920x678.jpg",
      subtitle: "A team of professional Travel Experts",
      title: "Trust Our Experience",
      cta: "Get in touch"
    },
    {
      image: "https://raw.githubusercontent.com/shivam13669/cliffhanger2/main/images/slider-4-slide-3-1920x678.jpg",
      subtitle: "Build your Next Holiday Trip with Us",
      title: "Create Your Tour",
      cta: "Get in touch"
    }
  ];

  return (
    <section className="relative w-full pt-16">
      <Swiper
        modules={[Autoplay, Pagination]}
        direction="vertical"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        style={{
          maxHeight: "35.3125vw",
          minHeight: "calc(100vh - 64px)"
        }}
        className="swiper-slider-corporate"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%"
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
              <div className="max-w-2xl mx-auto text-white text-center md:text-left">
                <h6 className="text-sm md:text-base uppercase tracking-widest font-semibold mb-4 text-white/90 animate-fade-in">
                  {slide.subtitle}
                </h6>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                  {slide.title.split(" ").map((word, i) => (
                    <span key={i}>
                      {i === slide.title.split(" ").length - 1 ? (
                        <span className="text-[#01b3a7]">{word}</span>
                      ) : (
                        word
                      )}
                      {i < slide.title.split(" ").length - 1 && " "}
                    </span>
                  ))}
                </h2>
                <Link
                  to="#contact"
                  className="inline-block px-8 py-3 md:px-10 md:py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-[#01b3a7] hover:border-[#01b3a7] transition-all duration-300"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-slider-corporate {
          width: 100%;
        }

        .swiper-pagination {
          bottom: 20px;
          z-index: 20;
        }

        .swiper-pagination-bullet {
          width: 14px;
          height: 14px;
          background: rgba(80, 186, 135, 0.6);
          opacity: 1;
        }

        .swiper-pagination-bullet-active {
          background: #01b3a7;
        }

        .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
