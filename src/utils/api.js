const url = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

export const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(handleResponse);
};

const getItemsList = () => {
  return request(`${url}/items`, {
    headers: headers,
  });
};

const addItem = ({ name, weather, imageUrl }) => {
  return request(`${url}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, weather, imageUrl }),
  });
};

const removeItem = (_id) => {
  return request(`${url}/items/${_id}`, {
    method: "DELETE",
    headers: headers,
  });
};

const api = {
  getItemsList,
  addItem,
  removeItem,
};

export default api;
