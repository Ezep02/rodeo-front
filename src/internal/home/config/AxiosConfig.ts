import axios from "axios";

const BASE_URL: string = "https://graph.instagram.com";

export const InstagramInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});


