import { url } from "./constants";
import { request } from "./api";

const signup = ({ name, avatar, email, password }) => {
  return request(`${url}/signup`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.log(err));
};
  
const signin = ({ email, password }) => {
  return request(`${url}/signin`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password }),
  })
    .then((res => res.json()))
    .then((data) => {
      if (data.user) {
        localStorage.setItem('jwt', data.jwt);
        return data;
      }
    })
};

const getContent = (token) => {
  return fetch(`${url}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    })
      .then(res => res.json())
      .then(data => data)
}

const auth = {
  signup,
  signin,
  getContent,
};

export default auth;
