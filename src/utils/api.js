import { url } from "./constants";

const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(handleResponse);
};

const getItemsList = () => {
  return request(`${url}/items`, {
    method: "GET",
  });
};

const addItem = ({ name, weather, imageUrl }, token) => {
  return request(`${url}/items`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  });
};

const removeItem = (_id, token) => {
  return request(`${url}/items/${_id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
};

const api = {
  getItemsList,
  addItem,
  removeItem,
};

export default api;
