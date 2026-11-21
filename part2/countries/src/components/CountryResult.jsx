import CountryView from "./CountryView";

export default function CountryResult({ countries = [] }) {
  if (countries.length === 0) return <p>There is no country</p>;
  return (
    <div>
      {countries.length < 10 && (
        <div>
          {/* More than 1 */}
          {countries.length > 1 &&
            countries.map((country) => <p>{country.name.common}</p>)}

          {/* 1 Country */}
          {countries.length === 1 && <CountryView country={countries[0]} />}
        </div>
      )}

      {countries.length >= 10 && (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
}
