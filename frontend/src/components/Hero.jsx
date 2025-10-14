import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden bg-[#1a0a2e] flex items-center justify-center">
      {/* Hero Background Image */}
      <img
        src="/hero.jpg"
        alt="Hero"
        className="w-full h-full object-cover sm:object-contain"
      />

      {/* Content over the image */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 px-4 w-full text-center">
        <button
          onClick={() => navigate("/events")}
          className="btn btn-warning text-black font-semibold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all"
        >
          Explore Events
        </button>
      </div>
    </section>
  );
};

export default Hero;
