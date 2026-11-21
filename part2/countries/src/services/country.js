import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api/";

export async function fetchAllCountries() {
  let cache = [];

  if (cache.length) return cache;

  const url = `${BASE_URL}/all`;

  const result = await axios.get(url);
  cache = result.data;
  return cache;
}
