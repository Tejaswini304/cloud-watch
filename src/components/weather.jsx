import { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "166b880b77e187d9040f1af6c6707e04";

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const result = await res.json();

      if (result.cod !== 200) {
        setError("City not found");
        setData(null);
        return;
      }

      setData(result);
      setError("");
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-icon">𝐂𝐥𝐨𝐮𝐝 𝐖𝐚𝐭𝐜𝐡⛅</div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city / state / country"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getWeather()}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

     {data && (
  <div className="weather-info">
    <h2>{data.name}, {data.sys.country}</h2>
    <div className="temp">{data.main.temp}°C</div>
    <div className="desc">{data.weather[0].main}</div>

    <div className="extra">
      {/* Group the stats together */}
      <div className="stats-row">
        <p>💧 {data.main.humidity}%</p>
        <p>🌬️ {data.wind.speed} m/s</p>
      </div>
      
      {/* Footer message stays outside the stats-row */}
      <div className="footer-msg">Have a Bright Day ☀️</div>
    </div>
  </div>
)}
    </div>
  );
};


export default Weather;

