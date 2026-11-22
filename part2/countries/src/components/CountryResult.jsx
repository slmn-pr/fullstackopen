import { useState } from "react";
import CountryRow from "./CountryRow";
import CountryView from "./CountryView";

export default function CountryResult({ countries = [] }) {
  const [selected, setSelected] = useState(null);
  if (countries.length === 0) return <p>There is no country</p>;

  const onShowCountry = (country) => {
    setSelected(country);
  };

  const clearSelected = () => {
    setSelected(null);
  };

  if (selected) {
    return (
      <div>
        {/* Back button */}
        <button onClick={clearSelected}>Back</button>

        {/* Country info */}
        <CountryView country={selected} />
      </div>
    );
  }

  return (
    <div>
      {countries.length < 10 && (
        <div>
          {/* More than 1 */}
          {countries.length > 1 &&
            countries.map((country) => (
              <CountryRow
                key={country.name.common}
                country={country}
                onShow={onShowCountry}
              />
            ))}

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
