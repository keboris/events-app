const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Discover the best <span className="text-yellow-300">Events</span> near
        you !
      </h1>
      <p className="text-lg mb-6 opacity-90">
        Concerts, exhibitions, conferences and more 🎉
      </p>
      <button className="btn btn-warning text-black font-semibold">
        Create an Event
      </button>
    </section>
  );
};

export default Hero;
