import api from "./api.js";

// Quantidade de Pokémon que aparece em cada página
export const POKEMON_POR_PAGINA = 20;

// Guardo a lista com todos os nomes para não pedir de novo a cada busca
let todosOsNomes = null;

// A URL de cada Pokémon termina com o ID (ex: .../pokemon/25/), então pego o último pedaço
export function pegarIdDaUrl(url) {
  const partes = url.split("/").filter(Boolean);
  return Number(partes[partes.length - 1]);
}

// Paginação da própria API: limit é quantos itens, offset é de onde começa
export async function listarPokemons(limite, offset) {
  const resposta = await api.get("/pokemon", {
    params: { limit: limite, offset: offset },
  });
  return resposta.data; // vem { count, results }
}

// Lista só com os nomes de todos os Pokémon, usada na busca por texto
export async function listarTodosOsNomes() {
  if (todosOsNomes) {
    return todosOsNomes;
  }
  const resposta = await api.get("/pokemon", {
    params: { limit: 100000, offset: 0 },
  });
  todosOsNomes = resposta.data.results;
  return todosOsNomes;
}

export async function listarTipos() {
  const resposta = await api.get("/type");
  return resposta.data.results;
}

// Pokémon de um tipo específico
export async function listarPokemonsPorTipo(tipo) {
  const resposta = await api.get(`/type/${tipo}`);
  // cada item vem como { pokemon: { name, url }, slot }, então pego só o pokemon
  return resposta.data.pokemon.map((item) => item.pokemon);
}

// Dados completos de um Pokémon (serve para o nome ou para o ID)
export async function buscarPokemon(idOuNome) {
  const resposta = await api.get(`/pokemon/${idOuNome}`);
  return resposta.data;
}
