const Hero = () => {
  return (
    <section className="relative w-full h-[70vh] overflow-hidden bg-[#1a0a2e] flex items-center justify-center">
      {/* Hero Background Image */}
      <img
        src="/hero.jpg"
        alt="Hero"
        className="w-full h-full object-contain"
      />

      {/* Content over the image */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button className="btn btn-warning text-black font-semibold text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all">
          Explore Events
        </button>
      </div>
    </section>
  );
};

export default Hero;
