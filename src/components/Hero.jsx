const Hero = () => {
  return (
    <section className="relative w-full h-[800px] overflow-hidden">
      {/* Hero Background Image */}
      <img
        src="/hero.png"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content over the image */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 px-4">
        <button className="btn btn-warning text-black font-semibold text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all">
          Explore Events
        </button>
      </div>
    </section>
  );
};

export default Hero;
