const Header = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">🎟️ EventsApp</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered input-sm"
          />
          <button className="btn btn-primary btn-sm">Sign In</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
