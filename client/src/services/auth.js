import axios from "axios";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const API = axios.create({
  baseURL: "/api",
});

API.interceptors.request.use((config) => {
  if (!store) {
    console.warn("Redux store not yet injected into Axios.");
    return config;
  }

  const state = store.getState();
  const token = state.session.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (credentials) => {
  const res = await API.post("/login", credentials);
  return res.data;
};

export default API;
