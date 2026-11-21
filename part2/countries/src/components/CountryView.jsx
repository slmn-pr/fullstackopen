export default function CountryView({ country }) {
  return (
    <div>
      <h1>{country.name.common}</h1>

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

      <img src={country.flags.png} alt={country.name.common} />
    </div>
  );
}
