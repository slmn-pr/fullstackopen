import { useEffect, useState } from "react";
import { fetchAllCountries } from "./services/country";
import CountryResult from "./components/CountryResult";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.trim().toLowerCase()),
  );

  useEffect(() => {
    // fetch all
    fetchAllCountries()
      .then((response) => setCountries(response))
      .catch((error) => {
        console.error("[App] fetchAllCountries error: ", error);

        alert("Fetch countries failed!");
      });
  }, []);

  useEffect(() => {
    setSelected(null);
  }, [search]);

  return (
    <div>
      <div>
        <label>
          find countries &nbsp;
          <input value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
      </div>

      {/* Result */}
      <CountryResult
        countries={filteredCountries}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}
