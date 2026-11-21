import { useEffect, useState } from "react";
import { fetchAllCountries } from "./services/country";
import CountryResult from "./components/CountryResult";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

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

  return (
    <div>
      <div>
        <label>
          find countries &nbsp;
          <input value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
      </div>

      {/* Result */}
      <CountryResult countries={filteredCountries} />
    </div>
  );
}
