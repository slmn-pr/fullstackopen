import { useEffect, useState } from "react";
import { getCountryWeather } from "../services/weather";

export default function WeatherInfo({ latlng }) {
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [lat, lon] = latlng;

  useEffect(() => {
    let ignore = false;

    setError(null);
    setWeather(null);
    setIsLoading(true);
    getCountryWeather(lat, lon)
      .then((response) => {
        if (!ignore) setWeather(response);
      })
      .catch((error) => {
        if (!ignore) {
          console.error("[CountryView] getCountryWeather error: ", error);
          setError(error.message);
          //   alert(`Get ${countryName} weather info failed`);
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [lat, lon]);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && weather && (
        <div>
          <p>Temperature {weather.main.temp} Celsius</p>

          {weather.weather?.[0] && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              title={weather.weather[0].description}
              width="100"
              height="100"
            />
          )}

          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
      {!isLoading && !weather && !error && <p>No weather data</p>}

      {!isLoading && error && (
        <div
          style={{
            maxWidth: "100dvw",
            minHeight: "20px",
            border: "2px solid red",
            background: "#f2f2f2",
            borderRadius: "8px",
            padding: "8px",
          }}
        >
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
