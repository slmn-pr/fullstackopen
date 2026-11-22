import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getCountryWeather(lat = 0, lon = 0) {
  return axios
    .get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching country weather:", error);
      throw error;
    });
}
