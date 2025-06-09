function SearchBar({ city, setCity, fetchWeather, fetchWeatherByLocation }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        type="text"
        placeholder="Skriv in en stad..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-grow px-3 py-2 border rounded text-black"
        aria-label="Stadsnamn"
        autoFocus
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!city.trim()}
      >
        Sök
      </button>
      <button
        type="button"
        onClick={fetchWeatherByLocation}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Nuvarande plats
      </button>
    </form>
  );
}

export default SearchBar;
