const url = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const getItemsList = () => {
  return fetch(`${url}/items`, {
    headers: headers,
  }).then(handleResponse);
};

const addItem = ({ name, weather, imageUrl }) => {
  return fetch(`${url}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(handleResponse);
};

const removeItem = (id) => {
  return fetch(`${url}/items/${id}`, {
    method: "DELETE",
    headers: headers,
  }).then(handleResponse);
};

const api = {
  getItemsList,
  addItem,
  removeItem,
};

export default api;
