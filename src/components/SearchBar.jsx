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
        className="flex-grow px-3 py-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={!city.trim()}
      >
        Sök
      </button>
      <button
        type="button"
        onClick={fetchWeatherByLocation}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Nuvarande plats
      </button>
    </form>
  );
}

export default SearchBar;
