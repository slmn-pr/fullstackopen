import WeatherInfo from "./WeatherInfo";

export default function CountryView({ country }) {
  const name = country.name.common;

  return (
    <div>
      <h1>{name}</h1>

      <p>Capital {country.capital?.[0] || "No capital"}</p>
      <p>Area {country.area}</p>

      <div>
        <h2>Languages</h2>

        <ul>
          {Object.values(country.languages || {}).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>

      <img src={country.flags.png} alt={name} />

      <h2>Weather in {name}</h2>
      <WeatherInfo countryName={name} latlng={country.latlng} />
    </div>
  );
}
