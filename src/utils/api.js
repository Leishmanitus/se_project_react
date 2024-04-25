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
    headers: {"Content-Type": "applicaiton/json",},
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

const likeItem = (_id, token) => {
  return request(`${url}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ _id }),
  });
};

const dislikeItem = (_id, token) => {
  return request(`${url}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ _id }),
  });
};

const updateUser = ({name, avatar}, token) => {
  return request(`${url}/users/me`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, avatar }),
  });
};

const api = {
  getItemsList,
  addItem,
  removeItem,
  likeItem,
  dislikeItem,
  updateUser,
};

export default api;
