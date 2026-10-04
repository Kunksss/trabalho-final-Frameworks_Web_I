// A API devolve tudo em inglês, então traduzi os tipos para mostrar em português
export const TIPOS_PT = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  electric: "Elétrico",
  grass: "Planta",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Veneno",
  ground: "Terra",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Aço",
  fairy: "Fada",
};

// Cor de cada tipo para os chips
const CORES_TIPOS = {
  normal: "#8E8E6A",
  fire: "#E8622C",
  water: "#4F7FE0",
  electric: "#D9A800",
  grass: "#4FA83D",
  ice: "#4DB8B0",
  fighting: "#B22A24",
  poison: "#8E3A8E",
  ground: "#C8A245",
  flying: "#8F7FD8",
  psychic: "#E8457A",
  bug: "#8FA010",
  rock: "#9C8A28",
  ghost: "#614A82",
  dragon: "#5A28E0",
  dark: "#5B473A",
  steel: "#8A8AAD",
  fairy: "#D77F94",
};

const NOMES_STATS = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Ataque Esp.",
  "special-defense": "Defesa Esp.",
  speed: "Velocidade",
};

export function traduzirTipo(tipo) {
  return TIPOS_PT[tipo] || tipo;
}

export function corDoTipo(tipo) {
  return CORES_TIPOS[tipo] || "#777777";
}

export function traduzirStat(stat) {
  return NOMES_STATS[stat] || stat;
}

// Transforma "mr-mime" em "Mr Mime"
export function formatarNome(nome) {
  return nome
    .split("-")
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(" ");
}

// Transforma 25 em "#025"
export function formatarId(id) {
  return "#" + String(id).padStart(3, "0");
}

// Uso a arte oficial e, se o Pokémon não tiver, uso o sprite pequeno
export function pegarImagem(pokemon) {
  const arteOficial = pokemon.sprites.other?.["official-artwork"]?.front_default;
  return arteOficial || pokemon.sprites.front_default;
}
