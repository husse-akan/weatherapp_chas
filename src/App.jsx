import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";


function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null);

  const getEmoji = () => {
  if (!weather) return "🌍";
  const condition = weather.weather[0].main.toLowerCase();

  if (condition.includes("rain")) return "🌧️";
  if (condition.includes("cloud")) return "☁️";
  if (condition.includes("clear")) return "☀️";
  if (condition.includes("snow")) return "❄️";
  if (condition.includes("thunderstorm")) return "⛈️";
  if (condition.includes("drizzle")) return "🌦️";
  if (condition.includes("fog") || condition.includes("mist")) return "🌫️";
  if (condition.includes("wind")) return "💨";

  return "🌡️";
};


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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-400 to-blue-700 text-white p-4">
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-2xl w-full max-w-md text-white">
      <h1 className="text-4xl font-bold mb-6 text-center drop-shadow-md">
  {getEmoji()} Weatherly
</h1>

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
            className="mt-4 bg-red-600 hover:cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded w-full transition-all"
          >
            Rensa senaste sökning
          </button>
        </>
      )}
    </div>
  </div>
);

}

export default App;