import TipBox from "./TipBox";

function WeatherCard({ weather }) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  const condition = weather.weather[0].main.toLowerCase();
  const temperature = weather.main.temp;

  
  let tip = "";
  if (condition.includes("rain")) {
    tip = "🌧 Glöm inte paraplyet!";
  } else if (condition.includes("snow")) {
    tip = "❄️ Klä dig varmt – det snöar!";
  } else if (condition.includes("wind")) {
    tip = "💨 Det blåser – ta på dig kappa!";
  } else if (condition.includes("cloud")) {
    tip = "☁️ Mulet idag – en jacka kan vara bra.";
  } else if (condition.includes("clear")) {
    tip = "☀️ Härligt väder – njut!";
  } else {
    tip = "👀 Ha koll på vädret och klä dig efter känsla!";
  }


  let tempTip = "";
  if (temperature >= 25) {
    tempTip = "🔥 Det är riktigt varmt – drick mycket vatten!";
  } else if (temperature <= 5) {
    tempTip = "🧊 Kallt ute – glöm inte mössa och vantar!";
  } else if (temperature <= 10) {
    tempTip = "🧥 Svalt väder – ta på dig en jacka!";
  }

  return (
    <div className="bg-white bg-opacity-20 p-4 rounded text-black text-center space-y-2">
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

      {/* 💡 Dynamiska tips */}
      <TipBox tip={tip} tempTip={tempTip} />

    </div>
  );
}

export default WeatherCard;
