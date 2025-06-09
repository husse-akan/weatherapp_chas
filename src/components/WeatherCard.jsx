function WeatherCard({ weather }) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="bg-white bg-opacity-20 p-4 rounded text-white text-center space-y-2">
      <h2 className="text-2xl font-semibold">{weather.name}</h2>
      <img src={iconUrl} alt={weather.weather[0].description} className="mx-auto" />
      <p className="capitalize">{weather.weather[0].description}</p>
      <p>🌡 Temperatur: {weather.main.temp}°C</p>
      <p>💧 Luftfuktighet: {weather.main.humidity}%</p>
      <p>🌬 Vind: {weather.wind.speed} m/s</p>
      <p>
        🕒 Uppdaterad:{" "}
        {new Date(weather.dt * 1000).toLocaleTimeString("sv-SE", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p>
        📅 Datum:{" "}
        {new Date(weather.dt * 1000).toLocaleDateString("sv-SE", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}

export default WeatherCard;
