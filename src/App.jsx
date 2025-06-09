import { useState, useEffect } from "react";
import WeatherCard from "./components/weatherCard";
import SearchBar from "./components/searchBar";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  

  const fetchWeather = async (chosenCity = city) => {
    if (!chosenCity) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&units=metric&appid=${API_KEY}&lang=sv`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setCity(chosenCity);
        localStorage.setItem("lastCity", chosenCity);
      } else {
        setWeather(null);
        alert("Stad hittades inte. Försök igen.");
      }
    } catch (error) {
      console.error("Fel vid hämtning av väderdata:", error);
    }
  };

  const clearSavedCity = () => {
    localStorage.removeItem("lastCity");
    setCity("");
    setWeather(null);
  };

  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}&lang=sv`
            );
            const data = await response.json();
            setWeather(data);
            setCity(data.name);
          } catch {
            alert("Kunde inte hämta vädret för din plats.");
          }
        },
        () => alert("Tillgång till plats nekades.")
      );
    } else {
      alert("Geolocation stöds inte av din webbläsare.");
    }
  };

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) fetchWeather(savedCity);
  }, []);

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h1>Weatherly ☀️</h1>
      <SearchBar
        city={city}
        setCity={setCity}
        fetchWeather={fetchWeather}
        fetchWeatherByLocation={fetchWeatherByLocation}
      />
      {weather && (
        <>
          <WeatherCard weather={weather} />
          <button
            onClick={clearSavedCity}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full transition-all"
          >
            Rensa senaste sökning
          </button>
        </>
      )}
    </div>
  );
}

export default App;