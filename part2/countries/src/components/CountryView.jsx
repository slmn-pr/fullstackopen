import { useEffect, useState } from "react";
import { getCountryWeather } from "../services/weather";

export default function CountryView({ country }) {
  const name = country.name.common;

  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const [lat, lon] = country["latlng"];

    setIsLoading(true);
    getCountryWeather(lat, lon)
      .then((response) => {
        console.log("[CountryView] getCountryWeather response: ", response);

        return setWeather(response);
      })
      .catch((error) => {
        console.error("[CountryView] getCountryWeather error: ", error);

        alert(`Get ${name} weather info failed`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [name]);

  return (
    <div>
      <h1>{name}</h1>

      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>

      <div>
        <h2>Languages</h2>

        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>

      <img src={country.flags.png} alt={name} />

      <h2>Weather in {name}</h2>
      {isLoading && <p>Loading...</p>}
      {!isLoading && weather && (
        <div>
          <p>Temperature {weather.main.temp} Celsius</p>

          {/* Situation img */}
          {/* TODO: Add weather image  (Windy, rainy, shower, sunny, snowy)*/}

          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
      {!isLoading && !weather && <p>No weather data</p>}
    </div>
  );
}
