import axios from "axios";

export const AuthenticationInstance = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH_BACKEND_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const INSTAGRAM_BASE_URL: string = "https://graph.instagram.com";


export const InstagramInstance = axios.create({
  baseURL: INSTAGRAM_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
