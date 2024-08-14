import axios from "axios";

export const api = axios.create({
  baseURL: 'http://127.1.1.0:3333'
});