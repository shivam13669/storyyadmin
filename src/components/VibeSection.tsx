const images = [
  "/images/vibe1.jpg",
  "/images/vibe2.jpg",
  "/images/vibe3.jpg",
  "/images/vibe4.jpg",
];

const VibeSection = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[hsl(174,30%,92%)] text-[hsl(174,50%,25%)]">
            <span className="text-[hsl(174,62%,30%)] text-lg">✦</span>
            Vibe with Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#181A1F]">
            Real Travel Stories From Around the World
          </h2>
        </div>
      </div>

      {/* Full-Width Edge-to-Edge Scrolling Gallery */}
      <div className="w-full overflow-hidden">
        <div className="flex gap-4 marquee-track">
          {[...images, ...images, ...images, ...images].map((img, i) => (
            <div
              key={i}
              className="w-64 h-80 rounded-3xl overflow-hidden shrink-0"
            >
              <img
                src={img}
                alt="Travel story"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-slate-500 mt-8 text-sm sm:text-base">
          Tag <span className="font-semibold text-[#181A1F]">#Storiesbyfoot</span> to get featured.
        </p>
      </div>
    </section>
  );
};

export default VibeSection;
