import axios from "axios";

// Configuração base do Axios, assim não preciso repetir a URL da PokéAPI em todo lugar
const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 15000,
});

export default api;
