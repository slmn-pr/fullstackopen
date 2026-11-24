import axios from "axios";

const BASE_URL = "/api/persons";

export function getAll() {
  return axios.get(BASE_URL).then((response) => response.data);
}

export function create(person) {
  return axios.post(BASE_URL, person).then((response) => response.data);
}

export function remove(id) {
  return axios.delete(`${BASE_URL}/${id}`);
}

export function editNumber(id, person) {
  return axios
    .put(`${BASE_URL}/${id}`, person)
    .then((response) => response.data);
}
